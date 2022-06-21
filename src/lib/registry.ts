/* import fs from 'fs'; */
import { spawnSync } from 'child_process';
/* import registryJson from "@thebettermint/registry/src/registry.json" */
import { Registry, RegistryArray, Head, RegistryEntry } from '../../types';

/**
 * registryOrganizations
 *
 * @param {string} json - Total registry including document head
 *
 * @return { { name, ein }[] } - Array of organization name and ein
 */
export const getRegistryOrganizations = (json: Registry) => {
  const registry = json
    .map((obj: RegistryArray | Head) => {
      if ('registry' in obj) return obj.registry;
      return undefined;
    })
    .filter(Boolean);

  if (!registry || registry[0] === undefined) return;

  let parsedArray = registry[0]
    .map((org: RegistryEntry | undefined) => {
      if (!org) return;
      return { name: org.name, ein: org.EIN };
    })
    .filter(Boolean);

  return parsedArray;
};

/**
 * getOrganizationAddress
 *
 * @param {string} json - Total registry including document head
 * @param {string} ein - Employer identifcation number of organization
 *
 * @return {string | Error} - Address if organization is found in registry
 */
export const getOrganizationAddress = (json: Registry, ein: string) => {
  try {
    const registry = json
      .map((obj: RegistryArray | Head) => {
        if ('registry' in obj) return obj.registry;
        return undefined;
      })
      .filter(Boolean);

    if (!registry || registry[0] === undefined) return;

    let filtered = registry[0].filter((org: RegistryEntry | undefined) => {
      ein === org?.EIN;
    });

    if (filtered.length > 1)
      throw Error(
        'Duplicate organizations with the same ein in registry. Please refer to repo and contact package maintainer'
      );

    let address = filtered[0].address;
    return address;
  } catch (error: any) {
    return Error(error.msg);
  }
};

/**
 *
 *
 *
 */
export const getOrganizationInitiative = () => {};

/**
 * getOrganizationDetailsByEIN
 *
 * @param { Registry } json - Total registry including document head
 * @param { string } ein - Employer identifcation number of organization
 *
 * @return { RegistryEntry } - Organization's registry entry
 */
export const getOrganizationDetailsByEIN = (json: Registry, ein: string) => {
  try {
    const registry = json
      .map((obj: RegistryArray | Head) => {
        if ('registry' in obj) return obj.registry;
        return undefined;
      })
      .filter(Boolean);

    if (!registry || registry[0] === undefined) return;

    let filtered = registry[0].filter((org: RegistryEntry | undefined) => {
      ein === org?.EIN;
    });

    if (filtered.length > 1)
      throw Error(
        'Duplicate organizations with the same ein in registry. Please refer to repo and contact package maintainer'
      );

    let org = filtered[0];
    return org;
  } catch (error: any) {
    return Error(error.msg);
  }
};

/**
 * getEINArrayRegistry
 *
 * @param {string} json - Total registry including document head
 *
 * @return { string[] } - Array of registry ein's
 */
export const getEINArrayRegistry = (json: Registry) => {
  try {
    const registry = json
      .map((obj: RegistryArray | Head) => {
        if ('registry' in obj) return obj.registry;
        return undefined;
      })
      .filter(Boolean);

    if (!registry || registry[0] === undefined) return;

    let einArray = registry[0]
      .map((org: RegistryEntry | undefined) => {
        return org?.EIN;
      })
      .filter(Boolean);

    if (einArray.length === 0)
      throw Error(
        'No organizations found in registry. Please refer to repo and contact package maintainer'
      );

    return einArray;
  } catch (error: any) {
    return Error(error?.msg);
  }
};

/**
 * getAddressArrayRegistry
 *
 * @param {string} json - Total registry including document head
 *
 * @return { string[] } - Array of registry xrpl addresses
 */
export const getAddressArrayRegistry = (json: Registry) => {
  try {
    const registry = json
      .map((obj: RegistryArray | Head) => {
        if ('registry' in obj) return obj.registry;
        return undefined;
      })
      .filter(Boolean);

    if (!registry || registry[0] === undefined) return;

    let addressArray = registry[0]
      .map((org: RegistryEntry | undefined) => {
        return org?.address;
      })
      .filter(Boolean);

    if (addressArray.length === 0)
      throw Error(
        'No organizations found in registry. Please refer to repo and contact package maintainer'
      );

    return addressArray;
  } catch (error: any) {
    return Error(error?.msg);
  }
};

/**
 *
 * determineVersionOfRegistry
 *
 * @return {string} - version of registry
 */
export const determineVersionOfRegistry = () => {
  let packageName = '@thebettermint/registry';
  let whyBuffer = spawnSync('yarn', ['why', packageName]);
  let grepBuffer = spawnSync('grep', ['Found'], { input: whyBuffer.stdout });
  let outputArray = grepBuffer.stdout.toString().split('\n');
  let parsedOutputArray = outputArray
    .filter((output) => output.length > 0)
    .map((output) => output.split('@')[1].replace('"', ''));
  return parsedOutputArray[0];
};
