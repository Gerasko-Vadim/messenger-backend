export interface IReadMesseges {

    readonly createUserId: string;


    readonly nameRoom: string


    readonly roomId: string


    readonly group: string;


    readonly messeges: [{

        readonly createdTime: string
        readonly author: string
        readonly messege: string
    }]
}