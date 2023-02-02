import React from "react";
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

import { Button } from "./Button";

describe("Running Test for Marbella Button", () => {

  test("Check Button Disabled", () => {
    render(<Button label={'Test Button'}/>)
    expect(screen.getByRole('button', { name: "Button marbella" })).toBeDisabled();
  });

});