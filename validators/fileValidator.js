const { AppError } = require("../utils/types")
const { File } = require("../database/models/file")

const createFileValidator = async (req,res,next) => {
    const { ip_list, limit } = req.body

    if (!!ip_list) {
        const modifiedIpList = ip_list.replace(/'/g, '"')

        if (isNotParsable(modifiedIpList)) {
            return next(new AppError(`ip_list must be an array of IP's`, 400)) 
        } else {
            for (let ip of JSON.parse(modifiedIpList)) {
                if (!/^((25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ip)) {
                    return next(new AppError(`one of entered IP's are not valid`, 400))
                }
            }

            if (JSON.parse(modifiedIpList).length == 0) {
                return next(new AppError("ip_list must have at least one IP", 400)) 
            }
        }
    }

    if (!!limit) {
        if (typeof Number(limit) !== "number" || limit < 0 || !Number.isInteger(Number(limit))) {
            return next(new AppError("invalid entry for limit", 400))
        }
    }

    return next()
}

const downloadFileValidator = async (req, res, next) => {
    const { id } = req.params
    const file = await File.findByPk(id)

    if (!!file.limit && file.limit === file.limit_count) {
        return next(new AppError("file limit is reached out", 404))
    }

    if (!!file.ip_list) {
        if (file.ip_list.includes(req.ip.slice(7))) {
            const filePath = `${file.path}`;
            return res.download(filePath);
        } else {
            return next(new AppError("IP Limit:you are not able to download this file!", 403))  
        }
    }

    return next()
}

const fileExistanceValidator = async (req, res, next) => {
    const { id } = req.params;

    // Find the file entry in the database by ID
    const file = await File.findByPk(id);

    if (!file) {
      return next(new AppError('File not found!', 404))
    }

    return next()
}

function isNotParsable(str) {
    try {
      JSON.parse(str);
      return false; // String is parsable
    } catch (error) {
      return true; // String is not parsable
    }
}

module.exports = { createFileValidator, downloadFileValidator, fileExistanceValidator }