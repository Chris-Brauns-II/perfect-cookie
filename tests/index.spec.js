/* eslint-disable */
import { render, cleanup } from '@testing-library/svelte'
import Index from '../src/routes/index.svelte'
import { properties } from '../src/store.js'

let propertyValues

properties.subscribe((actualProperties) => {
  propertyValues = actualProperties
})

describe('index page', () => {
  afterEach(() => {
    cleanup()
  })

  test('it should render the page title', () => {
    const { container, getByText } = render(Index)

    expect(getByText('The Perfect Cookie')).toBeInTheDocument()
    expect(container).toMatchSnapshot()
  })

  test('it should render 1 slider for each property', () => {
    const { queryAllByRole } = render(Index)

    expect(queryAllByRole('slider')).toHaveLength(propertyValues.length)
  })

  test('it should render the Ingredients section', () => {
    const { getByText } = render(Index)
    expect(getByText('Ingredients')).toBeInTheDocument()
  })

  test('it should render the Method section', () => {
    const { getByText } = render(Index)
    expect(getByText('Method')).toBeInTheDocument()
  })
})