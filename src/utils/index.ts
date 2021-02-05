import axios from './axios';
// @ts-ignore
import numeral from "numeral";
import * as Globals from './globals';
import Colors from './colors';
export * from './validations';
export * from './globals';
export * from './constants';


function moneyFormat(number: number): string {
	let money =  "S/ " + numeral(number).format("0,0.00");
	money = money.replace(',', '');
	money = money.replace('.', ',');
	return money;
}

export {
	moneyFormat,
	axios,
	Globals,
	Colors,
}
