# React Testing Tips

Helpful tips and resources for testing React components using [Jest](https://jestjs.io/)
and [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).

---
## Why Test?
- Although testing is hard and can be very frustrating at times, it can be a lot of fun!
- Testing helps promote thinking about how a component is going to work before implementation.
- It helps provides confidence for changes that will inevitably need to be made in the future.

## What About TDD?
- Use it where you can! It's not practical in every situation.
- There is something very gratifying about using TDD to create a component's functionality without
ever viewing it in the browser.

## Tests Should Always Fail
It is just as important to be able to make a test fail as it is to make it pass.

## Helpful Resources
- `RTL Cheatsheet`: https://testing-library.com/docs/react-testing-library/cheatsheet
- `Jest-Dom Matchers`: https://github.com/testing-library/jest-dom#table-of-contents
- `Common Mistakes with RTL`: https://kentcdodds.com/blog/common-mistakes-with-react-testing-library
- `All Things Written by Kent` https://kentcdodds.com

## Jest / RTL Tips
I have spent hours trying to figure out how to do things when it comes to testing. In most cases,
it usually involves mocking or there is a weird async thing happening in a component that is causing
the test to not work properly.

Below are a collection of tips that you may find helpful at some point!

## Be Aware of Query Return Types
- https://testing-library.com/docs/react-testing-library/cheatsheet#queries

If you want to test if a query result is `null`, then you will want to use a `queryBy` query.

If you want to be able to `await` a query in-line, then a `findBy` query would be in order.

## Use `screen.debug()` and `console.log` frequently

`screen.debug()` is a very useful RTL tool that will output the markup of a component within a test.

```js
it('this is a test', () => {
  render(<Component />);
  
  // Get a button.
  const button = screen.getByRole('button');
  
  // Will display the button markup if found.
  screen.debug(button);
  
  // Will display the markup of the whole component.
  screen.debug(); 
});
```
`console.log()` can be very useful when added to the actual component you are testing. For example,
let's say you are testing a form submission, and you want to verify that your test is triggering the
`onSubmit` handler. Adding in a `console.log()` to the handler can help you verify that the form is
actually being submitted in the test.

## Mock a Component

```js
// MyComponent.jsx

export const MyComponent = () => (<h1>This is a component</>);
```

```js
// MyComponent.spec.jsx

jest.mock('./MyComponent', () => ({
	MyComponent: () => (<div data-testid="myComponent">Test Component</div>),
}));
```

## Mock a Hook

```js
// useMyHook.js

export const useMyHook = () => {
	const update = () => {
		// Perform some updating logic.
  };
	
	return { update };
};
```

```js
// A component test file that uses the hook.

// Create a mock for the update function.
const mockUpdate = jest.fn();

jest.mock('./useMyHook', () => ({
  useMyHook: () => ({
    update: mockUpdate,
  }),
}));

// This will allow you to verify the update function has been called.
expect(mockUpdate).toHaveBeenCalled();
```

## Mocking Just One Function of a Hook

See: https://jestjs.io/docs/jest-object#jestrequireactualmodulename

```js
// useMyEnhancedHook.js

export const useMyHook = () => {
	// Perform read logic here.
	const read = () => {};

	// Perform creation logic here.
	const create = () => {};

	// Perform some updating logic.
	const update = () => {};

	return {
		create,
		read,
		update
	};
};
```

```js
// A component test file that uses the enhanced hook.

// Create a mock for the update function.
const mockUpdate = jest.fn();

jest.mock('./useMyHook', () => ({
	useMyHook: () => ({
    // Use the actual create and read implementations.
    ...jest.requireActual('./useMyEnhancedHook').useMyEnhancedHook(),
    // Mock just the update function.
		update: mockUpdate,
	}),
}));

// This will allow you to verify the update function has been called.
expect(mockUpdate).toHaveBeenCalled();
```
## Don't Forget About jest.clearAllMocks() or jest.resetAllMocks()

In most cases, if you are using mocks in your tests, you will want to either call
[jest.clearAllMocks()](https://jestjs.io/docs/jest-object#jestclearallmocks) or
[jest.resetAllMocks()](https://jestjs.io/docs/jest-object#jestresetallmocks) in the `beforeEach()` hook.
Otherwise, things might not work as expected in the test.

```js
describe('<MyComponent />', () => {
	beforeEach(() => {
		jest.clearAllMocks();
		// or
    jest.resetAllMocks();
  })
	it('this is the first test', () => {});
});
```
## Mock Different Implementation For Each Test

## Using a `setTimeout()` In Your Code?

`Timer Mocks`: https://jestjs.io/docs/timer-mocks

`jest.useFaketimers()`: https://jestjs.io/docs/jest-object#jestusefaketimersimplementation-modern--legacy

`jest.runAllTimers()`: https://jestjs.io/docs/jest-object#jestrunalltimers

Sometimes `setTimeout()` needs to be used inside of code. One example might be hiding or showing
a component on load for a specific amount of time. This code could look something like this:

```js
export const MyFormComponent = () => {
	const [show, setShow] = React.useState(false);
	
	// Show the form after two seconds on load.
	React.useEffect(() => {
		let showTimeout;

		const setShowTimeout = () => {
			showTimeout = setTimeout(() => {
				setShow(true);
			}, 2000);
		};

		setShowTimeout();

		return () => clearTimeout(showTimeout);
	}, []);

	show ? ( <form data-testid="my-form"></form> ) : null;
}
```

A resulting test might look something like this:

```js
it('should render form after 2 seconds', async () => {
	jest.useFakeTimers();
	render(<MyFormComponent />);

	await waitFor(() => {
		expect(screen.getByTestId('my-form')).toBeInTheDocument();
	});

	jest.runAllTimers();
});
```
