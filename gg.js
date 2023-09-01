const questionResponses = {
    'pemilikmu': "Aku diciptakan oleh M. Saiful Anam.",
    'siapa yang membuatmu': "Aku diciptakan oleh M. Saiful Anam.",
}
let text = 'pemilikmu'


async function customChatGpt(){
    for (const questionPattern in questionResponses) {
        if (text.includes(questionPattern)) {
            console.log(questionResponses[questionPattern])
        }
    }
}