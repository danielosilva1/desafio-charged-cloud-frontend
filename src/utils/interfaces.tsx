export interface CompanyData {
    cnpj: string,
    name: string,
    phoneNumber: string,
    address: string
}

export interface CompanyAddressData {
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