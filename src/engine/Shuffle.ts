//Source : https://codereview.stackexchange.com/questions/196493/shuffling-an-array-keeping-some-elements-fixed
//peg doit être un array correspondant aux index de array qui ne doivent pas être randomisés
//s'il n'y en a pas, tout array sera randomisé
export default function suffleArray(array, peg = array.map((e) => {return array.indexOf(e)})) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        if(!peg.includes(currentIndex) || !peg.includes(randomIndex)) continue;
        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}