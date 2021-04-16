import { Exclude, Expose } from "class-transformer";

@Exclude()
export class ReadableUserDto {
    @Expose()
    readonly name: string;
    @Expose()
    readonly surname: string;
    @Expose()
    readonly patronymic: string;
    @Expose()
    readonly email: string;
    @Expose()
    readonly group: string;
    @Expose()
    readonly isActive: string;
    @Expose()
    readonly role: string;
}
