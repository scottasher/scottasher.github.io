import {
  EnvelopeIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/outline";

const ActivateBanner = (props) => {
  function sendActivateEmail() {}

  return (
    <div
      id="alert-additional-content-4"
      class="p-4 mb-4 text-yellow-700 border border-yellow-300 rounded-lg bg-yellow-50"
      role="alert"
    >
      <div class="flex items-center">
        <InformationCircleIcon className="w-5 h-5 mr-2" />
        <span class="sr-only">Info</span>
        <h3 class="text-lg font-medium">Please activate your account</h3>
      </div>
      <div class="mt-2 mb-4 text-sm">
        Your account is currently <strong>not active</strong> and you will not
        be able to write a review, comment, or interact with posts. Please find
        the email we sent you to activate your account. If the link has expired,
        click the button below to receive a new one.
      </div>
      <div class="flex">
        <button
          type="button"
          onClick={sendActivateEmail}
          class="text-yellow-700 flex bg-transparent border border-yellow-700 hover:bg-yellow-800 hover:text-white focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-xs px-3 py-1.5 text-center"
          data-dismiss-target="#alert-additional-content-4"
          aria-label="Close"
        >
          <EnvelopeIcon class="-ml-0.5 mr-2 h-4 w-4" />
          Send Activate Email
        </button>
      </div>
    </div>
  );
};

export default ActivateBanner;
