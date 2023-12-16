import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import App from "./App";
import StageThree from "./components/Form/StageThree";
import StageTwo from "./components/Form/StageTwo";
import StageOne from "./components/Form/StageOne";
import HomePage from "./components/HomePage/HomePage";
import { FormProvider } from "./components/Form/FormContext";

test("renders learn react link", () => {
  render(
    <FormProvider>
      <App />
    </FormProvider>
  );
});

test("renders home page with slogan", () => {
  render(
    <MemoryRouter>
      <FormProvider>
        <HomePage />
      </FormProvider>
    </MemoryRouter>
  );

  const sloganElement = screen.getByText(/Mars Has Never Been Closer/i);
  expect(sloganElement).toBeInTheDocument();
});

//Stage one tests:

test("renders StageOne component", () => {
  render(
    <MemoryRouter initialEntries={["/stageOne"]}>
      <FormProvider>
        <Routes>
          <Route path="/stageOne" element={<StageOne />} />
        </Routes>
      </FormProvider>
    </MemoryRouter>
  );

  const headingElement = screen.getByText(/Personal Information/i);
  expect(headingElement).toBeInTheDocument();

  const fullNameInput = screen.getByLabelText(/Full Name/i);
  expect(fullNameInput).toBeInTheDocument();

  const dobInput = screen.getByLabelText(/Date of Birth/i);
  expect(dobInput).toBeInTheDocument();

  const emailInput = screen.getByLabelText(/Email/i);
  expect(emailInput).toBeInTheDocument();

  const phoneInput = screen.getByLabelText(/Phone/i);
  expect(phoneInput).toBeInTheDocument();

  const nextButton = screen.getByRole("button", { name: /Next/i });
  expect(nextButton).toBeInTheDocument();
});

test("submits the form on valid input", async () => {
  await (async () => {
    render(
      <MemoryRouter initialEntries={["/stageOne"]}>
        <FormProvider>
          <Routes>
            <Route path="/stageOne" element={<StageOne />} />
          </Routes>
        </FormProvider>
      </MemoryRouter>
    );

    // Fill out the form with valid data
    userEvent.type(screen.getByLabelText(/Full Name/i), "John Doe");
    userEvent.type(screen.getByLabelText(/Date of Birth/i), "2000-01-01");
    userEvent.type(screen.getByLabelText(/Email/i), "john@example.com");
    userEvent.type(screen.getByLabelText(/Phone/i), "+1 123-456-7890");

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /Next/i }));
  });
});

test("displays error messages on invalid input", async () => {
  await (async () => {
    render(
      <MemoryRouter initialEntries={["/stageOne"]}>
        <FormProvider>
          <Routes>
            <Route path="/stageOne" element={<StageOne />} />
          </Routes>
        </FormProvider>
      </MemoryRouter>
    );

    // Submit the form without filling out required fields correctly
    userEvent.type(screen.getByLabelText(/Full Name/i), "John");
    userEvent.type(screen.getByLabelText(/Date of Birth/i), "2015-01-01");
    userEvent.type(screen.getByLabelText(/Email/i), "john");
    userEvent.type(screen.getByLabelText(/Phone/i), "43");
    fireEvent.click(screen.getByRole("button", { name: /Next/i }));

    // Wait for error messages to appear
    await waitFor(() => {
      expect(
        screen.getByText(/Please enter at least first and last name/i) ||
          screen.getByText(/You must be at least 18 years old/i) ||
          screen.getByText(/Email is required/i) ||
          screen.getByText(/Phone is required/i)
      ).toBeInTheDocument();
    });
  });
});

//Stage Two Tests

test("renders StageTwo component", () => {
  render(
    <MemoryRouter initialEntries={["/StageTwo"]}>
      <FormProvider>
        <Routes>
          <Route path="/StageTwo" element={<StageTwo />} />
        </Routes>
      </FormProvider>
    </MemoryRouter>
  );
});

test("renders StageThree component", () => {
  render(
    <MemoryRouter initialEntries={["/StageThree"]}>
      <FormProvider>
        <Routes>
          <Route path="/StageThree" element={<StageThree />} />
        </Routes>
      </FormProvider>
    </MemoryRouter>
  );
});
