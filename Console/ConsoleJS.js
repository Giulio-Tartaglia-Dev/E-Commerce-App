function AddElement(Piu,current,Qts){

    Piu.addEventListener("click", () => {
        current.Qts ++;
        Qts.textContent = current.Qts;
        console.log("L'elemento è stato selezionato! ");
    });
}

function RemoveElement(Meno,current,Qts){

    Meno.addEventListener("click", () => {
        if(current.Qts > 0){
            current.Qts --;
            Qts.textContent = current.Qts;
            console.log("L'elemento è stato rimosso! ");
        }   
    });
}

function AddToCart(Cart,CartBadge,current,Qts,Items, card){

    Cart.addEventListener("click", () => {
        if(current.Qts > 0){

            const nomeProdotto = card.querySelector("h2").innerText;
            const prezzoTesto = card.querySelector(".Prezzo").innerText;
            const prezzoPulito = parseFloat(prezzoTesto.replace('€','').replace(',','.'));
            const prodotto = {
                nome: nomeProdotto,
                prezzo: prezzoPulito,
                quantita: current.Qts
            };

            let carrello = JSON.parse(localStorage.getItem("prodottiCarrello")) || [];

            const index = carrello.findIndex(item => item.nome === prodotto.nome);
            if(index != -1){
                carrello[index].quantita += prodotto.quantita;
            }else{
                carrello.push(prodotto);
            }

            localStorage.setItem("prodottiCarrello", JSON.stringify(carrello));

            Items.Total += current.Qts;
            CartBadge.textContent = Items.Total;

            CartBadge.classList.add("bump-animation");
            setTimeout(() => CartBadge.classList.remove("bump-animation"), 300);

            current.Qts = 0;
            Qts.textContent = 0;

            console.log("Prodotti Aggiunti Con Successo! ");
        }else{
            console.log("Seleziona almeno un elemento! ");
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    
    const CartBadge = document.querySelector(".Badge");
    const TutteLeCard = document.querySelectorAll(".Card-Prodotto");

    let carrelloSalvato = JSON.parse(localStorage.getItem("prodottiCarrello")) || [];
    let conteggioIniziale = carrelloSalvato.reduce((acc, item) => acc + item.quantita, 0);
    
    let Items = {
        Total: conteggioIniziale
    };
    
    CartBadge.textContent = Items.Total;
    
    TutteLeCard.forEach((card) => {

        const Meno = card.querySelector(".Btn-Meno");
        const Piu = card.querySelector(".Btn-Piu");
        const Qts = card.querySelector(".Quantities");
        const Cart = card.querySelector(".Add");

        let current = {
            Qts: 0
        };

        AddElement(Piu, current, Qts);
        RemoveElement(Meno, current, Qts);
        AddToCart(Cart, CartBadge, current, Qts, Items, card);
    });

    console.log("Tutte le schede sono ora indipendenti e pronte!");
});