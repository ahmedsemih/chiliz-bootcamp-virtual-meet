import Countdown from "react-countdown";
import React, { useEffect, useState } from "react";

import styles from "@/styles/Home.module.css";
import BackToHub from "@/components/BackToHub";
import { useBalances } from "@/hooks/useBalances";

function MeetingPage() {
    const countdownDate = new Date("2023-12-31T23:59:59");
    const { message, tokenBalances, loading } = useBalances();

    const [balance, setBalance] = useState(0);
    const [isEligible, setIsEligible] = useState(false);

    useEffect(() => {
        if (tokenBalances.length === 0) return;

        const selectedTokenIndex = tokenBalances.findIndex((token) => token.name === "Galatasaray S.K.");

        setBalance(Number(tokenBalances[selectedTokenIndex]?.balance) ?? 0);
        setIsEligible(Number(tokenBalances[selectedTokenIndex]?.balance) >= 1);
    }, [tokenBalances]);

    if (loading)
    return (
        <main className={styles.main}>
            <p>Loading...</p>
        </main>
    )

    if (message)
    return (
        <main className={styles.main}>
            <p>{message}</p>
            <BackToHub />
        </main>
    )

    return (
        <main className={styles.main}>
            <div className={styles.center}>
                <div>
                    <h1 className="my-8 text-center text-3xl font-bold">
                        MEETING WILL START SOON!
                    </h1>
                    <Countdown
                        date={countdownDate}
                        className={styles.countdown}
                    />
                    <h2 className="my-8 text-center text-xl font-bold">
                        <div className="my-4">
                            only Galatasaray fan token holders will be eligible to join
                        </div>
                        <div className="my-4">{`Your Galatasaray fan token balance is ${balance}`}</div>
                        <div className="my-4 ">
                            {`YOU ARE ${isEligible ? "" : "NOT"} ELIGIBLE`}
                        </div>
                    </h2>
                    <BackToHub />
                </div>
            </div>
        </main>
    );
}

export default MeetingPage;
