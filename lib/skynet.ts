import { parseSkylink, SkynetClient } from 'skynet-js';

interface NFTMetadata {
    name: string;
    description: string;
    image: string;
    metadataLink?: string;
}

// / Uploads media file (image, video, pdf etc.) to skynet
// / Returns the URI for the media file. Returns empty string '' if there's an error.
export const uploadMediaToSkynet = async (mediaFile: File) => {
    const portal = 'https://siasky.net/';
    const skyportal = new SkynetClient(portal);

    try {
        const { skylink } = skyportal.uploadFile(mediaFile);
        const parsedSkylink: string | null = parseSkylink(skylink);

        console.log('Metadata Skylink: ', skylink);

        return portal + parsedSkylink;
    } catch (err) {
        console.log(err);
        return '';
    }
};

// / Uploads metadata (JS object as JSON) to skynet.
// / Returns the URI for the metadata. Returns empty string '' if there's an error.
export const uploadMetadataToSkynet = async (metadata: NFTMetadata) => {
    const portal = 'https://siasky.net/';
    const skyportal = new SkynetClient(portal);

    const blob: BlobPart = new Blob([JSON.stringify(metadata)], {
        type: 'application/json',
    });

    const metadataFile = new File([blob], 'example.json');

    try {
        const { skylink } = await skyportal.uploadFile(metadataFile);
        const parsedSkylink: string | null = parseSkylink(skylink);

        console.log('Metadata Skylink: ', skylink);

        return portal + parsedSkylink;
    } catch (err) {
        console.log(err);
        return '';
    }
};
