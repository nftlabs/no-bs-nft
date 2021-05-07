import useSkynet from './useSkynet';

interface NFTMetadata {
    name: string;
    description: string;
    image: string;
}

export default function useNFT() {
    
    const { uploadMediaToSkynet, uploadMetadataToSkynet } = useSkynet();

    const storeNFTMetadata = async (name: string, description: string, file: File) => {
        const imageURI = await uploadMediaToSkynet(file);

        const metadataToUpload = {
            name,
            description,
            image: imageURI,
        };

        const metadataLink: string = await uploadMetadataToSkynet(metadataToUpload);
        return {imageURI, metadataLink};
    }

    return {
        storeNFTMetadata
    }
}