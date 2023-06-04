export default function createStatementData(invoice, plays){
    const result = {};
    result.customer = invoice.customer;
    result.performances = invoice.performances.map(enrichPerformance); // ??
    result.totalAmount = totalAmount(statementData);
    result.totalVolumeCredits = totalVolumeCredits(statementData);

    return result;

    function enrichPerformance(aPerformance){
        const result = Object.assign({}, aPerformance); //copy of the aPerformance object-- shallow copy
        result.play = playFor(result);
        result.amount = amountFor(result);
        result.volumeCredits = volumeCreditsFor(result);
        return result;
    }

    function playFor(aPerformance){
        return plays[aPerformance.playID];
    }

    function amountFor(aPerformance){
        let result = 0;
        switch (aPerformance.play.type) {
            case "tragedy":
                result = 40000;
              if (aPerformance.audience > 30) {
                result += 1000 * (aPerformance.audience - 30);
              }
              break;
            case "comedy":
                result = 30000;
              if (aPerformance.audience > 20) {
                result += 10000 + 500 * (aPerformance.audience - 20);
              }
              result += 300 * aPerformance.audience;
              break;
            default:
              throw new Error(`Unknown type: ${qPerformance.play.type}`);
          }
    
          return result;
    }

    function volumeCreditsFor(aPerformance){
        let result = 0;
        result += Math.max(aPerformance.audience - 30, 0);
        if(aPerformance.play.type ==="comedy"){
          result += Math.floor(aPerformance.audience / 5);
        }
      
        return result;
    }

    function totalAmount(data) { 
        return data.performances.reduce((total, p) => total + p.volumeCredits, 0);
     }
     
     function totalVolumeCredits(data){
       let result = 0;
         for (let perf of data.performances) {
           result += perf.volumeCredits;
         }
     
         return result;
     }
}
