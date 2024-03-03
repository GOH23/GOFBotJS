import { CreateTyanData } from './Commands/Stable Diffusion/createtyan.js';
import { CreateDonateData } from './Commands/donate.js';
import { CreateEmbedMessage } from './Commands/embed_message.js';
import { CreateMessForOpenData } from './Commands/create_krutki.js';
import { text_generationPipeline } from './Commands/QuestionAnswering/SlashComandsBuilder.js';
export const commands = [CreateTyanData,CreateDonateData,CreateEmbedMessage,CreateMessForOpenData,text_generationPipeline.toJSON()]
