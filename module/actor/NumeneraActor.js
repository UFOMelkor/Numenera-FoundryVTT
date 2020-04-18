import { NumeneraNPCActor } from "./NumeneraNPCActor.js";
import { NumeneraPCActor } from "./NumeneraPCActor.js";

/**
 * Numenera Actor base class
 *
 * Acts as a mix of factory and proxy: depending on its "type" argument,
 * creates an object of the right class (also extending Actor) and simply
 * overrides its own properties with that of that new objects.
 *
 * This is used since Actor doesn't really allow for real inheritance, so
 * we're simply faking it. #yolo #ididntchoosethethuglife
 *
 * @export
 */
const NumeneraActor = new Proxy(function () {}, {
  //Calling a constructor from this proxy object
  construct: function (target, args) {
    const [data] = args;
    switch (data.type) {
      case "pc":
        return new NumeneraPCActor(...args);

      case "npc":
        return new NumeneraNPCActor(...args);

      default:
        throw new Error("Unsupported Entity type for create(): " + data.type);
    }
  },
  //Property access on this weird, dirty proxy object
  get: function (target, prop, receiver) {
    switch (prop) {
      case "create":
        //Calling the class' create() static function
        return function (data, options) {
          switch (data.type) {
            case "pc":
              return NumeneraPCActor.create(data, options);
            case "npc":
              return NumeneraNPCActor.create(data, options);
            default:
              throw new Error(
                "Unsupported Entity type for create(): " + data.type
              );
          }
        };

      case Symbol.hasInstance:
        //Applying the "instanceof" operator on the instance object
        return function (instance) {
          return (
            instance instanceof NumeneraPCActor ||
            instance instanceof NumeneraNPCActor
          );
        };
      default:
        //Just forward any requested properties to the base Actor class
        return Actor[prop];
    }
  },
});

export { NumeneraActor };