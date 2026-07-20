<script setup lang="ts">
import { ref } from 'vue'

// Define the reactive accountData object
const accountData = ref({
  email: 'iot@asus.com',
  firstName: 'System',
  lastName: 'Admin',
  phone: '02-2894-3447',
  businessEmail: 'iot@asus.com',
  company: 'ASUS',
  department: '資安',
  occupation: 'IPC',
  city: 'Taiwan',
  referralPerson: '',
})
</script>

<template>
  <div class="container p-0 px-4">
    <div class="row align-items-center p-0 pt-4">
      <div class="col-12 pt-2 pb-2">
        <p class="fw-medium font-20 d-inline" style="font-size: 20px; font-weight: 300">
          ASUS Account ({{ accountData.email }})
        </p>

        <ul class="list-inline list-separator m-0 p-0 d-inline">
          <li class="list-inline-item">
            <p class="d-inline ps-3">
              <button
                class="btn bg-white fw-bold font-15"
                style="font-size: 15px; color: #155cf7 !important"
              >
                Change password
              </button>
            </p>
          </li>
          |
          <li class="list-inline-item">
            <p class="d-inline ps-3">
              <button
                class="btn bg-white fw-bold font-15"
                style="font-size: 15px; color: #ff3d00 !important"
              >
                Log out
              </button>
            </p>
          </li>
        </ul>
      </div>
    </div>

    <form class="needs-validation" id="target" novalidate>
      <div class="row align-items-center p-0 pt-3 pb-3 gx-3 gy-4">
        <div class="col-md-6 col-12">
          <label class="form-label fw-normal font-14" style="font-size: 14px"
            ><span style="color: red">* </span>Language</label
          >
          <select class="form-select" aria-label="lang">
            <option value="en-US" selected>English</option>
            <option value="zh-TW">繁體中文</option>
            <option value="zh-CN">簡體中文</option>
          </select>
        </div>
        <div class="col-md-3 col-sm-6 col-12">
          <label for="firstName" class="form-label fw-normal font-14" style="font-size: 14px"
            ><span style="color: red">* </span>First Name</label
          >
          <input
            type="text"
            class="form-control"
            name="firstName"
            id="firstName"
            maxlength="20"
            placeholder="Input"
            v-model="accountData.firstName"
            required
          />
          <div class="invalid-feedback">This field is required.</div>
        </div>
        <div class="col-md-3 col-sm-6 col-12">
          <label for="lastName" class="form-label fw-normal font-14" style="font-size: 14px"
            ><span style="color: red">* </span>Last Name</label
          >
          <input
            type="text"
            class="form-control"
            name="lastName"
            id="lastName"
            maxlength="20"
            placeholder="Input"
            v-model="accountData.lastName"
            required
          />
          <div class="invalid-feedback">This field is required.</div>
        </div>
        <div class="col-sm-6 col-12">
          <label for="phone" class="form-label fw-normal font-14" style="font-size: 14px"
            ><span style="color: red">* </span>Phone</label
          >
          <input
            type="text"
            class="form-control"
            name="phone"
            id="phone"
            maxlength="20"
            placeholder="Input"
            v-model="accountData.phone"
            required
          />
          <div class="invalid-feedback">This field is required.</div>
        </div>
        <div class="col-sm-6 col-12">
          <label for="businessEmail" class="form-label fw-normal font-14" style="font-size: 14px"
            ><span style="color: red">* </span>Business Email</label
          >
          <input
            type="text"
            class="form-control"
            name="businessEmail"
            maxlength="60"
            id="businessEmail"
            placeholder="Input"
            v-model="accountData.businessEmail"
            required
          />
          <div class="invalid-feedback">This field is required.</div>
        </div>
        <div class="col-md-3 col-sm-6 col-12">
          <label for="company" class="form-label fw-normal font-14" style="font-size: 14px"
            ><span style="color: red">* </span>Company</label
          >
          <input
            type="text"
            class="form-control"
            name="company"
            id="company"
            maxlength="30"
            placeholder="Input"
            v-model="accountData.company"
            required
          />
          <div class="invalid-feedback">This field is required.</div>
        </div>
        <div class="col-md-3 col-sm-6 col-12">
          <label for="department" class="form-label fw-normal font-14" style="font-size: 14px"
            >Department</label
          >
          <input
            type="text"
            class="form-control"
            name="department"
            id="department"
            maxlength="30"
            placeholder="Input"
            v-model="accountData.department"
          />
        </div>
        <div class="col-md-3 col-sm-6 col-12">
          <label for="occupation" class="form-label fw-normal font-14" style="font-size: 14px"
            >Occupation</label
          >
          <input
            type="text"
            class="form-control"
            name="occupation"
            id="occupation"
            maxlength="30"
            placeholder="Input"
            v-model="accountData.occupation"
          />
        </div>
        <div class="col-md-3 col-sm-6 col-12">
          <label for="city" class="form-label fw-normal font-14" style="font-size: 14px"
            >City</label
          >
          <input
            type="text"
            class="form-control"
            name="city"
            id="city"
            maxlength="30"
            placeholder="Input"
            v-model="accountData.city"
          />
        </div>
        <div class="col-12">
          <label for="referralPerson" class="form-label fw-normal font-14" style="font-size: 14px"
            >Referral Person</label
          >
          <input
            type="text"
            class="form-control"
            name="referralPerson"
            maxlength="40"
            id="referralPerson"
            placeholder="Input"
            v-model="accountData.referralPerson"
          />
        </div>
        <div class="col-12 text-center pt-2">
          <div class="row align-items-center">
            <div class="col-6">
              <button type="button" class="cancel-button text-primary fw-bold w-100">Cancel</button>
            </div>
            <div class="col-6">
              <button
                type="submit"
                class="btn btn-primary text-white fw-bold w-100"
                style="padding: 10px 20px"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>

    <hr class="pb-2" />
    <span class="fw-normal font-14">Support: </span>
    <ul class="list-inline list-separator m-0 p-0 d-inline" id="support_link">
      <li class="list-inline-item ps-3">
        <a
          class="list-separator-link text-decoration-none fw-semibold font-14 text-decoration-none"
          href="mailto:ai_solution@asus.com"
          >ai_solution@asus.com</a
        >
      </li>
      <li class="list-inline-item" style="color: #6c757d">
        <p class="d-inline ps-3 pe-3">|</p>
      </li>
      <li class="list-inline-item">
        <a
          class="list-separator-link text-decoration-none fw-semibold font-14 text-decoration-none"
          target="_blank"
          href="https://www.asus.com"
          >ASUS</a
        >
      </li>
      <li class="list-inline-item" style="color: #6c757d">
        <p class="d-inline ps-3 pe-3">|</p>
      </li>
      <li class="list-inline-item">
        <a
          class="list-separator-link text-decoration-none fw-semibold font-14 text-decoration-none"
          target="_blank"
          href="https://iot.asus.com/"
          >ASUS IoT</a
        >
      </li>
      <li class="list-inline-item" style="color: #6c757d">
        <p class="d-inline ps-3 pe-3">|</p>
      </li>
      <li class="list-inline-item">
        <a
          class="list-separator-link text-decoration-none fw-semibold font-14 text-decoration-none"
          target="_blank"
          href="https://www.connect.asus.com/ASUSIoT_ContactSales"
          >Contact Us</a
        >
      </li>
    </ul>
  </div>
</template>

<style scoped>
@import url(http://fonts.googleapis.com/css?family=Roboto:400,100,100italic,300,300italic,400italic,500,500italic,700,700italic,900italic,900);

@media (min-width: 900px) {
  .container {
    width: 900px;
  }
}

body {
  font-family: 'Roboto', sans-serif;
}

.cancel-button {
  border: 2px solid #007bff; /* Blue border */
  background-color: transparent; /* Transparent background */
  color: #007bff; /* Blue text */
  padding: 10px 20px; /* Add padding */

  border-radius: 5px; /* Rounded corners */
  cursor: pointer; /* Pointer cursor */
  transition: all 0.3s ease; /* Smooth transition for hover effect */
}

.header_link li {
  padding: 0 20px 0 0px;
  height: 25px;
}

.header_link li:not(:last-child) {
  margin-right: 0;
  border-right: 1px solid black;
}

.support_link li {
  padding: 0 16px 0 12px;
  height: 25px;
}

.support_link li:not(:last-child) {
  margin-right: 0;
  border-right: 1px solid black;
}

.list-inline-item {
  display: inline-block;
}
.list-inline-item:not(:last-child) {
  margin-right: 0.5rem;
}
</style>
