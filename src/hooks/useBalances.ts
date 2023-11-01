import Moralis from "moralis";
import { useCallback, useEffect, useState } from "react";

import { apiKey } from "@/util/addresses";
import { TokenBalance } from "@/types/TokenBalance";
import { current_chain_testnet } from "@/util/chain";
import { useAppContext } from "@/contexts/AppContext";
import { NativeBalance } from "./../types/NativeBalance";

export function useBalances() {
    const { address } = useAppContext();

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [nativeBalance, setNativeBalance] = useState<NativeBalance>();
    const [tokenBalances, setTokenBalances] = useState<TokenBalance[]>([]);

    const fetchTokenBalance = useCallback(async () => {
        try {
            if (!address) return;
            if (!Moralis.Core.isStarted) {
                await Moralis.start({ apiKey });
            }

            const token_balances = await Moralis.EvmApi.token.getWalletTokenBalances({
                address,
                chain: current_chain_testnet
            });

            setTokenBalances(token_balances.toJSON());

            const native_balance = await Moralis.EvmApi.balance.getNativeBalance({
                address,
                chain: current_chain_testnet,
            });

            setNativeBalance(native_balance.toJSON());
        } catch (e) {
            console.log(e);
            setMessage("Error!");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTokenBalance();
    }, [fetchTokenBalance]);

    return {
        loading,
        message,
        tokenBalances,
        nativeBalance,
    };
}
