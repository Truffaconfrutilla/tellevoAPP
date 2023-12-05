export interface Weather {
    latitude:  string,
    longitude: string,
    current_units: {
        temperature_2m: string,
        relative_humidity_2m: string,
        wind_speed_10m: string,
    }
    current: {
        time: string,
        temperature_2m: number,
        relative_humidity_2m: number,
        wind_speed_10m: number,
    }
}