
import { GetImageFromSD, row } from "./createtyan.js";
import base64Img from 'base64-img';

export async function GenerateAIImage(interaction){
    GetImageFromSD(interaction).then(async (res) => {
        var FilePath = base64Img.imgSync("data:image/png;base64," + res.data.images[0], "", "image");
        await interaction.editReply({ files: [FilePath] });
    }).catch(async (err)=>{
        await interaction.editReply({ content: "Произошла непредвиденная ошибка, попробуйте позже" });
    })
}