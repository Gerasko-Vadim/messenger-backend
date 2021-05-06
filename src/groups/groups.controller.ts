import { Controller, Get } from "@nestjs/common";
import { GroupsService } from "./groups.service";
import { IGroup } from "./interface/group.interface";

@Controller('groups')
export class GroupsController {
    constructor(private readonly groupsService: GroupsService) { }

    @Get()
    async getAllGroups(): Promise<IGroup[]>{
        return this.groupsService.findAll()
    }
}