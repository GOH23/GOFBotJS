import { pipeline } from '@xenova/transformers';
export default async function AIPipeline(interaction) {
    if (interaction.commandName == "text_generation") {

        await interaction.deferReply({ ephemeral: false });
        const text = interaction.options.getString("text_to_generation");
        const generator = await pipeline('text-generation', 'Xenova/TinyLlama-1.1B-Chat-v1.0');

        // Define the list of messages
        const messages = [
            { "role": "system", "content": "You are a friendly assistant." },
            { "role": "user", "content": text },
        ]

        // Construct the prompt
        const prompt = generator.tokenizer.apply_chat_template(messages, {
            tokenize: false, add_generation_prompt: true,
        });

        // Generate a response
        await generator(prompt, {
            max_new_tokens: 256,
            temperature: 0.7,
            do_sample: true,
            top_k: 50,
        }).then((res) => {

            interaction.editReply(res[0].generated_text);
        });

    }

}