import { plainToInstance } from "class-transformer";
import { ValidationError, validate } from "class-validator";
import { RequestHandler } from "express";
import logger from "../utils/logger";
import { sanitize } from "class-sanitizer";
import ErrorMessage from "../enums/error.message.enum";
import HttpException from "../exceptions/HttpException";

const dtoValidationMiddleware =
    (
        type: any,
        value: "body" | "query" | "params" | "file" | "files" = "body",
        message: ErrorMessage,
        skipMissingProperties = false,
        whitelist = true,
        forbidNonWhitelisted = false,
    ): RequestHandler => {
        return (req, res, next) => {
            const dtoObject = plainToInstance(type, req[value])
            validate(dtoObject, {
                skipMissingProperties,
                whitelist,
                forbidNonWhitelisted
            }).then((errors: ValidationError[]) => {
                if (errors.length > 0) {
                    logger.error(errors)
                    next(new HttpException(400, message))
                } else {
                    sanitize(dtoObject)
                    req[value] = dtoObject
                    next()
                }
            })
        }
    }

export default dtoValidationMiddleware