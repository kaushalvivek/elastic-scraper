exports.forLogs = async function (logs) {
    logs.forEach((log) => {
        processLog(log);
    }) 
}

async function processLog(log) {
    ```
    process log here:
    - store to disc
    - send to an external monitoring service
    - etc.
    ```
};