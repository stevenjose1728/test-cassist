import ReactDOM from 'react-dom';
import './index.scss';
import 'dropify/dist/css/dropify.css';
import App from './App'

declare global {
	interface Array<T> {
		range(start: number, end: number): [];
		removeByIndex(index: number): []
	}
}

if (!Array.prototype.range) {
	Array.prototype.range = function<T>(this: [], start: number, end: number): [] {
		const out: [] = [];
		const n: number = this.length<end
			? this.length
			: end;
		for (let i = start; i<n; i++) out.push(this[i]);
		return out;
	}
}

if (!Array.prototype.removeByIndex) {
	Array.prototype.removeByIndex = function<T>(this: [], index: number): [] {
		const array: [] = [...this];
		array.splice(index, 1);
		return array;
	}
}

ReactDOM.render(<App />, document.getElementById('root'));
