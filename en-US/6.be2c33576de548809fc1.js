(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"S9+m":function(e,t,a){"use strict";a.r(t),a.d(t,"RatesModule",(function(){return M}));var c=a("ofXK"),n=a("tyNb"),r=a("itXk"),o=a("LRne"),i=a("JX91"),l=a("pLZG"),b=a("eIep"),s=a("lJxs"),f=a("JIr8"),m=a("lSTU"),u=a("Wf04"),d=a("wd/R"),p=a("fXoL"),h=a("tk/3");let v=(()=>{class e{constructor(e){this.httpClient=e}getRates(e,t){return this.httpClient.get(`https://api.exchangeratesapi.io/${t}?base=${e}`)}}return e.\u0275fac=function(t){return new(t||e)(p.Yb(h.a))},e.\u0275prov=p.Ib({token:e,factory:e.\u0275fac,providedIn:"any"}),e})();var g=a("3Pt+"),R=a("kmnG"),y=a("d3UM"),S=a("qFsG"),j=a("iadO"),w=a("FKr1"),C=a("+0xr");function D(e,t){if(1&e&&(p.Sb(0,"mat-option",13),p.Xb(1,14),p.xc(2),p.Rb()),2&e){const e=t.$implicit;p.jc("value",e),p.Bb(2),p.zc(" ",e," ")}}function B(e,t){1&e&&(p.Sb(0,"th",24),p.Wb(1,25),p.Rb())}function O(e,t){if(1&e&&(p.Sb(0,"td",26),p.xc(1),p.Rb()),2&e){const e=t.$implicit;p.Bb(1),p.yc(e.name)}}function k(e,t){1&e&&(p.Sb(0,"th",24),p.Wb(1,27),p.Rb())}function I(e,t){if(1&e&&(p.Sb(0,"td",26),p.xc(1),p.Rb()),2&e){const e=t.$implicit;p.Bb(1),p.yc(e.value)}}function $(e,t){1&e&&p.Nb(0,"tr",28)}function x(e,t){1&e&&p.Nb(0,"tr",29)}function N(e,t){if(1&e&&(p.Sb(0,"div",2),p.Sb(1,"table",17),p.Qb(2,18),p.vc(3,B,2,0,"th",19),p.vc(4,O,2,1,"td",20),p.Pb(),p.Qb(5,21),p.vc(6,k,2,0,"th",19),p.vc(7,I,2,1,"td",20),p.Pb(),p.vc(8,$,1,0,"tr",22),p.vc(9,x,1,0,"tr",23),p.Rb(),p.Rb()),2&e){const e=p.ec().ngIf,t=p.ec();p.Bb(1),p.jc("dataSource",e),p.Bb(7),p.jc("matHeaderRowDef",t.displayedColumns),p.Bb(1),p.jc("matRowDefColumns",t.displayedColumns)}}function z(e,t){1&e&&(p.Sb(0,"div",30),p.Sb(1,"h3"),p.Wb(2,31),p.Rb(),p.Rb())}function J(e,t){if(1&e&&(p.Sb(0,"div"),p.vc(1,N,10,3,"div",15),p.vc(2,z,3,0,"ng-template",null,16,p.wc),p.Rb()),2&e){const e=t.ngIf,a=p.mc(3);p.Bb(1),p.jc("ngIf",e.length)("ngIfElse",a)}}const F=[{path:"",component:(()=>{class e{constructor(e,t){this.ratesService=e,this.formBuilder=t,this.currencyOptions=m.a,this.minDate=new Date(u.a.minDate),this.maxDate=new Date,this.displayedColumns=["name","value"]}ngOnInit(){this.form=this.formBuilder.group({base:u.a.defaultCurrency,date:new Date}),this.rates$=Object(r.a)([this.form.controls.base.valueChanges.pipe(Object(i.a)(u.a.defaultCurrency)),this.form.controls.date.valueChanges.pipe(Object(l.a)(e=>d(u.a.minDate).isSameOrBefore(e)&&d().isSameOrAfter(e)),Object(i.a)(d()))]).pipe(Object(b.a)(([e,t])=>this.ratesService.getRates(e,d(t).format(u.a.dateFormat)).pipe(Object(s.a)(e=>Object.keys(e.rates).map(t=>({name:t,value:e.rates[t]})).filter(t=>t.name!==e.base).sort((e,t)=>e.name>t.name?1:t.name>e.name?-1:0)),Object(f.a)(()=>Object(o.a)([])))))}}return e.\u0275fac=function(t){return new(t||e)(p.Mb(v),p.Mb(g.c))},e.\u0275cmp=p.Gb({type:e,selectors:[["app-rates"]],decls:17,vars:9,consts:function(){return[[1,"content"],[3,"formGroup"],[1,"custom-stuff-center"],["appearance","fill",1,"pr-10"],"Base curreny",["formControlName","base"],[3,"value",4,"ngFor","ngForOf",6,"placeholder"],["appearance","fill",1,"pl-10"],"Choose a date",["matInput","","formControlName","date",3,"min","max","matDatepicker"],["matSuffix","",3,"for"],["picker",""],[4,"ngIf"],[3,"value",6,"placeholder"],["placeholder","Base"],["class","custom-stuff-center",4,"ngIf","ngIfElse"],["noResults",""],["mat-table","",1,"mat-elevation-z8",3,"dataSource"],["matColumnDef","name"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","value"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],["mat-header-cell",""],"Curreny",["mat-cell",""],"Value",["mat-header-row",""],["mat-row",""],[1,"custom-stuff-center","no-results"],"No results, try different date"]},template:function(e,t){if(1&e&&(p.Sb(0,"div",0),p.Sb(1,"form",1),p.Sb(2,"div",2),p.Sb(3,"mat-form-field",3),p.Sb(4,"mat-label"),p.Wb(5,4),p.Rb(),p.Sb(6,"mat-select",5),p.vc(7,D,3,2,"mat-option",6),p.Rb(),p.Rb(),p.Sb(8,"mat-form-field",7),p.Sb(9,"mat-label"),p.Wb(10,8),p.Rb(),p.Nb(11,"input",9),p.Nb(12,"mat-datepicker-toggle",10),p.Nb(13,"mat-datepicker",null,11),p.Rb(),p.Rb(),p.Rb(),p.vc(15,J,4,2,"div",12),p.fc(16,"async"),p.Rb()),2&e){const e=p.mc(14);p.Bb(1),p.jc("formGroup",t.form),p.Bb(6),p.jc("ngForOf",t.currencyOptions),p.Bb(4),p.jc("min",t.minDate)("max",t.maxDate)("matDatepicker",e),p.Bb(1),p.jc("for",e),p.Bb(3),p.jc("ngIf",p.gc(16,7,t.rates$))}},directives:[g.o,g.k,g.e,R.b,R.e,y.a,g.j,g.d,c.j,S.b,g.b,j.d,j.f,R.f,j.c,c.k,w.i,C.j,C.c,C.e,C.b,C.g,C.i,C.d,C.a,C.f,C.h],pipes:[c.b],styles:[".custom-stuff-center[_ngcontent-%COMP%]{align-items:center;justify-content:center;display:flex}table[_ngcontent-%COMP%]{width:25%}"]}),e})()}];let G=(()=>{class e{}return e.\u0275mod=p.Kb({type:e}),e.\u0275inj=p.Jb({factory:function(t){return new(t||e)},imports:[[n.b.forChild(F)],n.b]}),e})(),M=(()=>{class e{}return e.\u0275mod=p.Kb({type:e}),e.\u0275inj=p.Jb({factory:function(t){return new(t||e)},imports:[[c.c,g.f,g.m,G,R.d,S.c,y.b,j.e,w.h,C.k]]}),e})()}}]);