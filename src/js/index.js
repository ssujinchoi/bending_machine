import { BeverageGenerator} from "./components/beverageGenerator.js";
import { VendingMachine } from "./components/vendingMachine.js";

const colaGenerator = new BeverageGenerator();
colaGenerator.setup();
const vendingMachine = new VendingMachine();
vendingMachine.setUp();
