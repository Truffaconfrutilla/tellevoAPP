export interface RandomUser {
    name: {
        first: string,
        last: string,
        title: string,
    },
    email: string,
    login: {
        password: string,
    }
}

export interface RandomUserResponse {
    results: RandomUser[];
    info: {
        seed: string,
        results: number,
        page: number,
        version: string,
    };
}