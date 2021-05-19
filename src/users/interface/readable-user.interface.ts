
export interface IReadableUser{
    readonly avatar: string;
    readonly name: string;
    readonly surname: string;
    readonly patronymic: string;
    readonly email: string;
    readonly group: string;
    readonly isActive: string;
    readonly role: string;
    accessToken?: string;
}