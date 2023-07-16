const { File } = require("../database/models/file")
const { AppError } = require("../utils/types")
const fs = require("node:fs/promises")
const path = require("path")


const getAllFiles = async (req, res, next) => {
    const files = await File.findAll()
    res.status(200).json(files)
}

const uploadFile = async (req,res,next) => {
    const { filename, path, size } = req.file
    const { ip_list, limit } = req.body
    const newFile = await File.create({filename, path, size, ip_list, limit, limit_count: 0 })
    return res.status(201).json(newFile)
}

const downloadFile = async (req, res, next) => {
    console.log(req.ip)

    const { id } = req.params;
    const file = await File.findByPk(id);
    // res.status(200).json(file)

    if (!!file.limit) {
        await File.update({limit_count: String(Number(file.limit_count) + 1)},{where: {id: id}})
    }

    const filePath = `${file.path}`;
    return res.download(filePath);
}

const updateFile = async (req, res, next) => {
    const updatedFile = {}
    const { id } = req.params
    const file = await File.findByPk(id)

    const { ip_list, limit} = req.body

    if (!!req.file) {
        updatedFile.filename = req.file.filename
        updatedFile.path = req.file.path
        updatedFile.size = req.file.size

        await fs.unlink(file.path)
    }

    if (!!ip_list) updatedFile.ip_list = ip_list
    if (!!limit && limit < file.limit_count) {
        return next(new AppError("limit can not be less than limit_count"))
    }
    
    updatedFile.limit = limit

    await File.update(updatedFile,{where: { id: id}})
    res.status(200).send("file has been successfully updated")
}

const deleteFile = async (req, res, next) => {
    const { id } = req.params
    const file = await File.findByPk(id)
    await fs.unlink(file.path)
    await File.destroy({where: { id: id}})
    res.status(200).send("file has been successfully deleted")
}

module.exports = { getAllFiles , uploadFile, downloadFile, updateFile, deleteFile }