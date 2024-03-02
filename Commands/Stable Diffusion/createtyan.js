import { ButtonStyle, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder } from 'discord.js'
import axios from 'axios';
const ModelObject = [
	{
		name: "v1-5-pruned-emaonly",
		value: "v1-5-pruned-emaonly.safetensors"
	},
	{
		name: "dreamlike-anime-1.0",
		value: "dreamlike-anime-1.0.safetensors"
	}]
export const url = "http://0.0.0.0:7861";
export const row = new ActionRowBuilder().addComponents(
	new ButtonBuilder()
		.setCustomId("torating")
		.setLabel("Добавить в рейтинг")
		.setStyle(ButtonStyle.Primary)
		.setEmoji("⭐")
)
const data = new SlashCommandBuilder()
	.setName('generate_art')
	.setDescription('ИИ генерирует арт после присылается фото')
	.addStringOption(option =>
		option.setName('prompt')
			.setDescription("Задайте нужное описание картинки, которую вы хотите сгенерировать")
			.setRequired(true))
	.addStringOption(opt => opt.setName("model").setDescription("Задайте модель генерации нейросети").setRequired(true))

ModelObject.map((el) => { data.options[1].addChoices(el) })
export function GetImageFromSD(interaction) {
	const prompt = interaction.options.getString("prompt");
	const sd_model_checkpoint = interaction.options.getString("model");
	axios.post(url + "/sdapi/v1/options", {
		sd_model_checkpoint: sd_model_checkpoint,
		CLIP_stop_at_last_layers: 2
	});
	return axios.post(url + "/sdapi/v1/txt2img", {
		prompt: "(masterpiece:1.2, best quality), " + prompt,
		//enable_hr: true,
		hr_upscaler: "R-ESRGAN 4x+ Anime6B",
		//hr_resize_x: 1024,
		negative_prompt: "((((ugly)))), (((duplicate))), ((morbid)), ((mutilated)), out of frame, extra fingers, mutated hands, ((poorly drawn hands)), ((poorly drawn face)), (((mutation))), (((deformed))), ((ugly)), blurry, ((bad anatomy)), (((bad proportions))), ((extra limbs)), cloned face, (((disfigured))), out of frame, ugly, extra limbs, (bad anatomy), gross proportions, (malformed limbs), ((missing arms)), ((missing legs)), (((extra arms))), (((extra legs))), mutated hands, (fused fingers), (too many fingers), (((long neck))), ((((ugly)))), (((duplicate))), ((morbid)), ((mutilated)), out of frame, extra fingers, mutated hands, ((poorly drawn hands)), ((poorly drawn face)), (((mutation))), (((deformed))), ((ugly)), blurry, ((bad anatomy)), (((bad proportions))), ((extra limbs)), cloned face, (((disfigured))), out of frame, ugly, extra limbs, (bad anatomy), gross proportions, (malformed limbs), ((missing arms)), ((missing legs)), (((extra arms))), (((extra legs))), mutated hands, (fused fingers), (too many fingers), (((long neck))) , ((((ugly)))), (((duplicate))), ((morbid)), ((mutilated)), out of frame, extra fingers, mutated hands, ((poorly drawn hands)), ((poorly drawn face)), (((mutation))), (((deformed))), ((ugly)), blurry, ((bad anatomy)), (((bad proportions))), ((extra limbs)), cloned face, (((disfigured))), out of frame, ugly, extra limbs, (bad anatomy), gross proportions, (malformed limbs), ((missing arms)), ((missing legs)), (((extra arms))), (((extra legs))), mutated hands, (fused fingers), (too many fingers), (((long neck)))",
		//hr_resize_y: 1024,
		width: 512,
		height: 512,
		//styles: [
		//"Default_Negative",
		//],
		//denoising_strength: 6.5,
		//hr_scale: 2,
		sampler_name: "DPM++ 2M SDE Karras",
		steps: 10
	});
}
export const CreateTyanData = data.toJSON();

