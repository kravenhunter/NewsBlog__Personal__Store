import { useAuthStore } from "@/stores/authStore";
import { storeToRefs } from "pinia";

export default defineNuxtRouteMiddleware((to) => {
  const { statAuth } = storeToRefs(useAuthStore()); // make authenticated state reactive
  const token = useCookie("firebaseToken"); // get token from cookies

  if (token.value) {
    // check if value exists
    statAuth.value.authenticated = true; // update the state to authenticated
  }

  //   if token doesn't exist redirect to log in
  if (!token.value && to?.meta?.layout === "admin") {
    abortNavigation();

    return navigateTo("/");
  }
});
