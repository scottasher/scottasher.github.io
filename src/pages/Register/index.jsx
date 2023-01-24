import React from "react";
import Input from "../../components/Input";
import Checkbox from "../../components/Checkbox";
import Button from "../../components/Button";
import { Link } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { FORM_OPTIONS } from "./form.config";
import { useAuth } from "../../hooks/useAuth";
import { toast } from "react-toastify";

const Register = (props) => {
  const { form, updateForm, isValid } = useForm(FORM_OPTIONS);
  const { register } = useAuth();

  function handleUpdateForm(e) {
    const { value, id } = e;
    updateForm({ value, id });
  }

  async function handleSubmit() {
    register({ user: form });
  }

  return (
    <>
      <div className="min-h-full w-full md:h-screen flex items-center px-4 justify-center py-12">
        <div className="max-w-md w-full space-y-8">
          <div className="w-full">
            <p className="text-center text-4xl font-bold pb-5">
              Create Account
            </p>
            <div className="my-3">
              <Input
                id="email"
                onChange={handleUpdateForm}
                placeholder="Email"
                value={form.email}
              />
            </div>
            <div className="my-3">
              <Input
                id="password"
                onChange={handleUpdateForm}
                type="password"
                placeholder="Password"
                value={form.password}
              />
            </div>
            {/* <div className="flex items-center justify-between">
              <Checkbox
                label="Remember me"
                id="rememberMe"
                onChange={(e) =>
                  handleUpdateForm({ id: e.id, value: e.checked })
                }
              />
              <Link
                to="/forgot/password"
                className="hover:underline font-semibold"
              >
                Forgot Password?
              </Link>
            </div> */}
            <div className="my-3">
              <Button
                type="dark"
                // disabled={!isValid}
                onClick={handleSubmit}
                className="w-full"
              >
                Sign Up
              </Button>
            </div>
          </div>
          <div className="text-center pt-10">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="underline font-semibold">
                Click here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
