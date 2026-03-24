document.addEventListener("DOMContentLoaded", () => {

    const riepilogo = document.querySelector(".Riepilogo");
    const totaleElemento = document.querySelector(".Totale");
    const messaggioVuoto = document.querySelector(".Messaggio1");
    const badge = document.querySelector(".Badge");

    function caricaCarrello(){
        
        let carrello = JSON.parse(localStorage.getItem("prodottiCarrello")) || [];
        
        riepilogo.innerHTML = "I tuoi Articoli: ";
        let totalePrezzo = 0;
        let totalePezzi = 0;

       
        if(carrello.length === 0){
            messaggioVuoto.style.display = "block";
            totaleElemento.textContent = "0€";
            if(badge) badge.textContent = "0";
            return;
        }

        messaggioVuoto.style.display = "none";

        carrello.forEach((prodotto, index) => {
            const subtotale = prodotto.prezzo * prodotto.quantita;
            totalePrezzo += subtotale;
            totalePezzi += prodotto.quantita;

            const divArticolo = document.createElement("div");
            divArticolo.classList.add("Articolo-In-Lista"); 
            divArticolo.innerHTML = `
                <div class="Articolo-Info">
                    <span class="Articolo-Nome">${prodotto.nome}</span>
                    <span class="Articolo-Quantita">(x${prodotto.quantita})</span>
                </div>
                <div class="Articolo-Prezzo-Group">
                    <span class="Articolo-Prezzo">${subtotale.toFixed(2)}€</span>
                    <button onclick="rimuoviDato(${index})" class="Btn-Rimuovi">Rimuovi</button>
                </div>
                `;
            riepilogo.appendChild(divArticolo);
        });

        totaleElemento.textContent = totalePrezzo.toFixed(2) + "€";
        if(badge) badge.textContent = totalePezzi;
    }

    window.rimuoviDato = function(index) {
        let carrello = JSON.parse(localStorage.getItem("prodottiCarrello")) || [];
        carrello.splice(index, 1);
        localStorage.setItem("prodottiCarrello", JSON.stringify(carrello));
        caricaCarrello();
    };

    const btnCheck = document.querySelector(".Btn-Check");
    if(btnCheck) {
        btnCheck.addEventListener("click", () => {
            let carrello = JSON.parse(localStorage.getItem("prodottiCarrello")) || [];
            if(carrello.length > 0) {
                alert("Ordine inviato con successo!");
                localStorage.removeItem("prodottiCarrello");
                location.reload();
            } else {
                alert("Il carrello è vuoto!");
            }
        });
    }
        
    caricaCarrello();
});