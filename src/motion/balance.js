
export const useBalance = () => {

    let offBalance = false;

    const isOffBalance = () => offBalance;
    const setOffBalance = value => offBalance = value;

    return {
        isOffBalance,
        setOffBalance
    };
}