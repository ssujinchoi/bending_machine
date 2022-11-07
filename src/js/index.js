import { BeverageGenerator } from "./components/beverageGenerator.js";
import { VendingMachine } from "./components/vendingMachine.js";

const colaGenerator = new BeverageGenerator();
const vendingMachine = new VendingMachine();
// await 대상인 함수는 async함수여야한다.
// 원래 이렇게 안됐지만 최근에 탑레벨에서 사용가능하다.
await colaGenerator.setup();
vendingMachine.setUp();
