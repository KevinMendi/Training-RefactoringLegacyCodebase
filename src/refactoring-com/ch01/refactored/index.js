const plays = require("../datasource/plays.json");
const invoices = require("../datasource/invoices.json");

function statement(invoice, plays) {
  const statementData = {};
  statementData.customer = invoice.customer;
  statementData.performances = invoice.performances.map(enrichPerformance);
  statementData.totalAmount = totalAmount(statementData);
  statementData.totalVolumeCredits = totalVolumeCredits(statementData);
  return renderPlainText(statementData, plays);
}

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

function renderPlainText(data, plays){
  let result = `Statement for ${data.customer}\n`;
  for(let perf of data.performances){
    result += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`;
  }
  result += `Amount owed is ${usd(data.totalAmount)}\n`;
  result += `You earned ${data.totalVolumeCredits} credits\n`;
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

function usd(aNumber){
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(aNumber);
}

function volumeCreditsFor(aPerformance){
  let result = 0;
  result += Math.max(aPerformance.audience - 30, 0);
  if(aPerformance.play.type ==="comedy"){
    result += Math.floor(aPerformance.audience / 5);
  }

  return result;
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


console.log(statement(invoices, plays));