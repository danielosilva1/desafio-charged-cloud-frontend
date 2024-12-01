export interface CompanyData {
    id: number,
    cnpj: string,
    name: string,
    phoneNumber: string,
    addressId: Number
}

export interface CompanyAddressData {
    id: number,
    cnpj: string,
    name: string,
    phoneNumber: string,
    cep: string,
    street: string,
    neighborhood: string,
    number: number,
    additionalInfo: string,
    city: string,
    state: string
}

export interface GetCompaniesParams {
    cnpj: string,
    name: string
}

export interface AddressData {
    id: number,
    cep: string,
    street: string,
    neighborhood: string,
    number: number,
    additionalInfo: string,
    city: string,
    state: string
}

export interface CustomError {
    msg: string
}