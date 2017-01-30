/// <reference path='fourslash.ts'/>

////module FindRef3 {
////	module SimpleClassTest {
////		export class Foo {
////			public [|{| "isWriteAccess": true, "isDefinition": true |}foo|](): void {
////			}
////		}
////		export class Bar extends Foo {
////			public [|{| "isWriteAccess": true, "isDefinition": true |}foo|](): void {
////			}
////		}
////	}
////
////	module SimpleInterfaceTest {
////		export interface IFoo {
////			[|{| "isWriteAccess": true, "isDefinition": true |}ifoo|](): void;
////		}
////		export interface IBar extends IFoo {
////			[|{| "isWriteAccess": true, "isDefinition": true |}ifoo|](): void;
////		}
////	}
////
////	module SimpleClassInterfaceTest {
////		export interface IFoo {
////			[|{| "isWriteAccess": true, "isDefinition": true |}icfoo|](): void;
////		}
////		export class Bar implements IFoo {
////			public [|{| "isWriteAccess": true, "isDefinition": true |}icfoo|](): void {
////			}
////		}
////	}
////
////	module Test {
////		export interface IBase {
////			[|{| "isWriteAccess": true, "isDefinition": true |}field|]: string;
////			[|{| "isWriteAccess": true, "isDefinition": true |}method|](): void;
////		}
////
////		export interface IBlah extends IBase {
////			[|{| "isWriteAccess": true, "isDefinition": true |}field|]: string;
////		}
////
////		export interface IBlah2 extends IBlah {
////			[|{| "isWriteAccess": true, "isDefinition": true |}field|]: string;
////		}
////
////		export interface IDerived extends IBlah2 {
////			[|{| "isWriteAccess": true, "isDefinition": true |}method|](): void;
////		}
////
////		export class Bar implements IDerived {
////			public [|{| "isWriteAccess": true, "isDefinition": true |}field|]: string;
////			public [|{| "isWriteAccess": true, "isDefinition": true |}method|](): void { }
////		}
////
////		export class BarBlah extends Bar {
////			public [|{| "isWriteAccess": true, "isDefinition": true |}field|]: string;
////		}
////	}
////
////	function test() {
////		var x = new SimpleClassTest.Bar();
////		x.[|foo|]();
////
////		var y: SimpleInterfaceTest.IBar = null;
////		y.[|ifoo|]();
////
////        var w: SimpleClassInterfaceTest.Bar = null;
////        w.[|icfoo|]();
////
////		var z = new Test.BarBlah();
////		z.[|field|] = "";
////        z.[|method|]();
////	}
////}

const ranges = test.rangesByText();

const fooRanges = ranges.get("foo");
const [foo0, foo1, foo2] = fooRanges;
verify.referenceGroups(foo0, [{ definition: "(method) SimpleClassTest.Foo.foo(): void", ranges: fooRanges }]);
verify.referenceGroups([foo1, foo2], [
    { definition: "(method) SimpleClassTest.Foo.foo(): void", ranges: [foo0] },
    { definition: "(method) SimpleClassTest.Bar.foo(): void", ranges: [foo1, foo2] }
]);
TODO:REST

const ifooRanges = ranges.get("ifoo");
const [ifoo0, ifoo1, ifoo2] = ifooRanges;
verify.referenceGroups(ifoo0, [{ definition: "(method) SimpleClassTest.Foo.foo(): void", ranges: ifooRanges }]);



//erify.singleReferenceGroup("(method) SimpleClassTest.Foo.foo(): void", ranges.get("foo"));
