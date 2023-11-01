import Moralis from "moralis";
import { useCallback, useEffect, useState } from "react";

import { TokenData } from "@/types/TokenData";
import { current_chain } from "@/util/chain";
import { apiKey, token_address_list } from "@/util/addresses";

export function useTokenMetadata() {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(true);
    const [tokens, setTokens] = useState<TokenData[]>([]);

    const fetchTokenMetadata = useCallback(async () => {
        try {
            if (!Moralis.Core.isStarted) {
                await Moralis.start({ apiKey });
            }

            const token_metadatas = await Moralis.EvmApi.token.getTokenMetadata({
                chain: current_chain,
                addresses: token_address_list,
            });

            const tokenDatas = token_metadatas.toJSON();
            setTokens(tokenDatas);
        } catch (e) {
            setMessage("Error!");
            console.log(e);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchTokenMetadata();
    }, [fetchTokenMetadata]);

    return {
        message,
        loading,
        tokens,
    };
}
