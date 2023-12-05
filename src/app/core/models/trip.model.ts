export interface Trip{
    studentName: string,
    studentEmail: string,
    partnerName: string,
    partnerEmail: string,
    origin: {
        address: string,
        lat: number,
        long: number,
    }
    destination: {
        address: string,
        lat: number,
        long: number,
    }
}