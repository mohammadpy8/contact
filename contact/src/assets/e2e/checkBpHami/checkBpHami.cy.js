/// <reference types="Cypress" />

import { password, mhamiCheckTarhBp, tokenBP } from "../../info";
import { numberWithCommas } from "../../utils";

describe("چک کردن ام اقساط با حامی", () => {
  it("با حامی", () => {
    Cypress.on("uncaught:exception", (err, runnable) => false);
    cy.wait(500);

    cy.loginBP(mhamiCheckTarhBp.username, password); /// وارد کردن اطلاعات
    cy.wait(500);

    cy.visit(Cypress.env("BACK_PANEL_URL")); /// باز کردن سایت
    cy.wait(500);
    cy.get("label").contains("لیست درخواست های اقساطی").click();
    cy.wait(500);
    cy.get("label").contains("ام بازار").first().click();
    cy.wait(500);
    cy.get("label")
      .contains("ام بازار")
      .first()
      .scrollIntoView({ easing: "linear" });
    cy.wait(500);
    cy.get("label")
      .contains("لیست درخواست های اقساطی ام بازار دارای حامی")
      .click();
    cy.wait(500);
    cy.get("input[id='text-filter-column-id']")
      .click()
      .type(mhamiCheckTarhBp.code);
    cy.wait(500);
    cy.get("button")
      .contains(" اعمال فیلتر")
      .scrollIntoView({ easing: "linear" });
    cy.wait(500);
    cy.get("button").contains(" اعمال فیلتر").click();
    cy.wait(500);
    cy.get(":nth-child(1) > a > div > .fas").click({ force: true });
    cy.wait(500);

    cy.then(() => {
      cy.request({
        method: "GET",
        url: `https://stage1api.qhami.com/facility/back-panel/admin/mbazar/${mhamiCheckTarhBp.code}`,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenBP}`,
        },
      }).then((res) => {
        console.log(res.body);
        const fullName = res.body.fullName;
        const username = res.body.username;
        const nationalCode = res.body.nationalCode;
        const code = res.body.trackingCode;
        const facilityCode = res.body.facilityRequestReservedId;
        const amount = res.body.amount;
        const credit = res.body.credit;
        const facilityAmount = res.body.facilityAmount;
        const entrepreneur = res.body.entrepreneur;
        const prePayment = res.body.prePayment;
        const mounth = res.body.monthCount;
          const serviceCost = res.body.serviceCost;
          const parcelList = res.body.parcelList;
        console.log(fullName, username, nationalCode, code);
        cy.get(".gift-value-label").each((element, index) => {
          console.log(element, index);
          if (index === 0) {
            cy.wrap(element)
              .invoke("text")
              .then((text) => {
                expect(text.trim()).to.equal(username);
              });
            cy.wait(500);
          } else if (index === 1) {
            cy.wrap(element)
              .invoke("text")
              .then((text) => {
                expect(text.trim()).to.equal(fullName);
              });
            cy.wait(500);
          } else if (index === 2) {
            cy.wrap(element)
              .invoke("text")
              .then((text) => {
                expect(Number(text.trim())).to.equal(code);
              });
            cy.wait(500);
          } else if (index === 3) {
            cy.wrap(element)
              .invoke("text")
              .then((text) => {
                expect(text.trim()).to.equal(nationalCode);
              });
            cy.wait(500);
          } else if (index === 4) {
            cy.wrap(element)
              .invoke("text")
              .then((text) => {
                expect(Number(text.trim())).to.equal(mounth);
              });
            cy.wait(500);
          } else if (index === 5) {
            cy.wrap(element)
              .invoke("text")
              .then((text) => {
                const newText = text.split(" ");
                const textFinall = newText[0].split(",").join("");
                console.log(textFinall);
                expect(amount).to.equal(Number(textFinall));
              });
            cy.wait(500);
          } else if (index === 6) {
            cy.wrap(element)
              .invoke("text")
              .then((text) => {
                const newText = text.split(" ");
                const textFinall = newText[0].split(",").join("");
                expect(facilityAmount).to.equal(Number(textFinall));
              });
            cy.wait(500);
          } else if (index === 7) {
            cy.wrap(element)
              .invoke("text")
              .then((text) => {
                const newText = text.split(" ");
                expect(prePayment).to.equal(Number(newText[0]));
              });
            cy.wait(500);
          } else if (index === 8) {
            cy.wrap(element)
              .invoke("text")
              .then((text) => {
                const newText = text.split(" ");
                const textFinall = newText[0].split(",").join("");
                expect(serviceCost).to.equal(Number(textFinall));
              });
          } else if (index === 10) {
            cy.wrap(element)
              .invoke("text")
              .then((text) => {
                const newText = text.split(" ");
                const textFinall = newText[0].split(",").join("");
                expect(credit).to.equal(Number(textFinall));
              });
          }
        });
        cy.wait(500);
        cy.get("span")
          .contains("لیست اطلاعات هسته کارآفرینی اجتماعی و اطلاعات مرسوله")
          .scrollIntoView({ easing: "linear" });
      });
        cy.wait(500);
        cy.get(".fas").click({ force: true });
        cy.wait(500);
        cy.get(".rc-table-row-cell-break-word").then((element) => {
            console.log(element);
        })
    });
  });
});
