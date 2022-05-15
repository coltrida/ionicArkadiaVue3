const help = () => {
    let base = '';
    if(window.location.host === 'localhost:8100'){
        //console.log('locale');
        base = 'http://statistichearkadia.test/api/';
    } else {
        //console.log('web');
        base = 'https://www.andirivieni.eu/api/';
    }
    return {
        linkvetture: base+'vetture',
        linkinseriscivettura: base+'vetture/inserisci',
        linkragazzi: base+'ragazzi',
        linkinserisciragazzo: base+'inserisciRagazzo',
        linkattivita: base+'attivita',
        linkinserisciattivita: base+'inserisciAttivita',
        linkoperatori: base+'operatori',
        linkinseriscioperatore: base+'operatori/inserisci',
        linkpresenzeoperatori: base+'presenze',
        linklistachilometrivetture: base+'chilometri',
        linkinserisciviaggio: base+'chilometri/inserisci',
        linkattivitaragazzo: base+'attivita/ragazzo',
        linkinserisciuscita: base+'inserisciUscita',
        linkinseriscientrata: base+'inserisciEntrata',
        linksaldomese: base+'saldoMese',
        linkeliminaprimanota: base+'eliminaPrimanota',
        linkstatisticapresenzeragazzi: base+'statistiche/presenzeRagazzi',
        linkstatisticapresenzeoperatori: base+'statistiche/presenzeOperatori',
        linklistasettimane: base+'statistiche/listaSettimane',
        linkstatisticachilometrivettura: base+'statistiche/chilometriVetture',
        linkstatisticachilometriragazzi: base+'statistiche/chilometriRagazzi',
        linkstassociazioni: base+'associazioni',
        linkaggiungistassociazione: base+'attivita/ragazzo/associa',
        linkaggiungistassociazioneoperatoreore: base+'operatori/associaOre',
        linklogin: base+'login',
        linkprimodelmese: base+'primoDelMese',
        linkcaricaagricoltura: base+'agricoltura',
        linkcaricaagricolturameseanno: base+'agricolturaMeseAnno',
    };
};
export default help;
