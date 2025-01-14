import {generateError} from "./../helpers/index"
import getRequestedFieldsFromResolverInfo from "./../helpers/getRequestedFieldsFromResolverInfo";
import { subscribe } from "graphql";

export const generateQueriesCrudSchema = (moduleName: String) => {
    return `
        view${moduleName}(id: Int): ${moduleName}
        list${moduleName}(pagination: PaginationInput, filters: [FilterInput]): ${moduleName}List
    `;
}

export const generateMutationsCrudSubscriptionSchema = (moduleName: String) => {
    return `
        created${moduleName}: ${moduleName}
        deleted${moduleName}: ${moduleName}
        updated${moduleName}: ${moduleName}
        bulkUpdated${moduleName}:  [${moduleName}]
        bulkCreated${moduleName}:  [${moduleName}]
        bulkDeleted${moduleName}:  [${moduleName}]
    `
}

export const getSubscriptionConstants = (moduleName: String) => {
    return {
        createdModule: `created${moduleName}`,
        deletedModule: `deleted${moduleName}`,
        updatedModule: `updated${moduleName}`,
        bulkCreatedModule: `bulkUpdated${moduleName}`,
        bulkUpdatedModule: `bulkCreated${moduleName}`,
        bulkDeletedModule: `bulkDeleted${moduleName}`,
    }
}

export const generateSubscriptionsCrudResolvers = (moduleName: String, pubsub: any) => {
    const {createdModule, deletedModule ,updatedModule , bulkCreatedModule ,bulkUpdatedModule ,bulkDeletedModule} = getSubscriptionConstants(moduleName);
    return {
        [createdModule]: {
            subscribe: () => pubsub.asyncIterator([createdModule])
        },
        [deletedModule]: {
            subscribe: () => pubsub.asyncIterator([deletedModule])
        },
        [updatedModule]: {
            subscribe: () => pubsub.asyncIterator([updatedModule])
        },
        [bulkCreatedModule]: {
            subscribe: () => pubsub.asyncIterator([bulkCreatedModule])
        },
        [bulkUpdatedModule]: {
            subscribe: () => pubsub.asyncIterator([bulkCreatedModule])
        },
        [bulkDeletedModule]: {
            subscribe: () => pubsub.asyncIterator([bulkDeletedModule])
        }
    }
}

export const generateMutationsCrudSchema = (moduleName: String) => {
    return `
        create${moduleName}(input: ${moduleName}Input): ${moduleName}
        delete${moduleName}(input: ${moduleName}Input): ${moduleName}
        update${moduleName}(input: ${moduleName}Input): ${moduleName}
        bulkUpdate${moduleName}(input: [${moduleName}Input]): [${moduleName}]
        bulkCreate${moduleName}(input: [${moduleName}Input]): [${moduleName}]
        bulkDelete${moduleName}(input: [${moduleName}Input]): [${moduleName}]
    `;
}

export const generateCrudResolvers = (moduleName: any, pubsub) => {
    const {createdModule, deletedModule ,updatedModule , bulkCreatedModule ,bulkUpdatedModule ,bulkDeletedModule} = getSubscriptionConstants(moduleName);
    return {
        mutations: {
            [`create${moduleName}`]: async (_:any, args:any, context:any,info: any) => {
                let requestedFields = getRequestedFieldsFromResolverInfo(info);
                let result = await context.models[moduleName].create(args.input,requestedFields);
                pubsub.publish(createdModule,{
                    [createdModule]: result
                });
                return result;
            },
            [`delete${moduleName}`]: async (_:any, args:any, context:any,info: any) => {
                let result = await context.models[moduleName].delete(args.input);
                pubsub.publish(deletedModule,{
                    [deletedModule]: result
                });
                return result;
            },
            [`update${moduleName}`]: async (_:any, args:any, context:any,info: any) => {
                let requestedFields = getRequestedFieldsFromResolverInfo(info);
                let result = await context.models[moduleName].update(args.input,requestedFields);
                pubsub.publish(updatedModule,{
                    [updatedModule]: result
                });
                return result;
            },
            [`bulkDelete${moduleName}`]: async (_:any, args:any, context:any,info: any) => {
                let requestedFields = getRequestedFieldsFromResolverInfo(info);
                let result = await context.models[moduleName].bulkDelete(args.input,requestedFields);
                pubsub.publish(bulkCreatedModule,{
                    [bulkCreatedModule]: result
                });
                return result;
            },
            [`bulkCreate${moduleName}`]: async (_:any, args:any, context:any,info: any) => {
                let requestedFields = getRequestedFieldsFromResolverInfo(info);
                let result = await context.models[moduleName].bulkCreate(args.input,requestedFields);
                pubsub.publish(bulkUpdatedModule,{
                    [bulkUpdatedModule]: result
                });
                return result;
            },
            [`bulkUpdate${moduleName}`]: async (_:any, args:any, context:any,info: any) => {
                let requestedFields = getRequestedFieldsFromResolverInfo(info);
                let result = await context.models[moduleName].bulkUpdate(args.input,requestedFields);
                pubsub.publish(bulkDeletedModule,{
                    [bulkDeletedModule]: result
                });
                return result;
            }
        },
        queries: {
            [`view${moduleName}`]: async (_:any, args:any, context:any,info: any) => {
                let requestedFields = getRequestedFieldsFromResolverInfo(info);
                return await context.models[moduleName].view(args,requestedFields);
            },
            [`list${moduleName}`]: async (_:any, args:any, context:any,info: any) => {
                let requestedFields = getRequestedFieldsFromResolverInfo(info);
                return await context.models[moduleName].paginate(args,requestedFields);
            }
        }
    }
}

export const generateListTypeForModule = (moduleName: String) => {
    return `
        type ${moduleName}List {
            list: [${moduleName}]
            pagination: Pagination
            filters: [Filter]
        }
    `;
}