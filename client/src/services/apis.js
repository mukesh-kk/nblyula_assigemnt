
const HealthApi = {
    GET_HEALTH: `${import.meta.env.VITE_SERVER_END}/api/health`,//get
};

const LibApis={
    GET_BOOKS: `${import.meta.env.VITE_SERVER_END}/api/library/books`,//get
    BUY_BOOK: `${import.meta.env.VITE_SERVER_END}/api/library/checkout`

}

export { HealthApi,LibApis };