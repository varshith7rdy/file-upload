import { BlobServiceClient, BlockBlobClient, StorageSharedKeyCredential } from "@azure/storage-blob"
import dotenv from "dotenv"

dotenv.config()

const connStr = process.env.CONNECTION_STRING;

const blobServiceClient = BlobServiceClient.fromConnectionString(connStr);

// Connect to a container
const containerName = "newcontainer1774101659317";
const containerClient = blobServiceClient.getContainerClient(containerName);


// create a new blob object
const blobName = `newblob ${+new Date()}`;
const blockBlobClient = containerClient.getBlockBlobClient(blobName);
const pathToFile = "/home/varshith/file-sharing/backend/.env"

const options = {
    
    blockSize: 4 * 1024 * 1024,
    concurrency: 5,
}

// upload the file
const res = await blockBlobClient.uploadFile(pathToFile, options)   