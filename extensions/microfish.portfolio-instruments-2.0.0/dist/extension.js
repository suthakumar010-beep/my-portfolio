/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((module) => {

"use strict";
module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ext = void 0;
var ext;
(function (ext) {
})(ext || (exports.ext = ext = {}));


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PiExtTreeDataProvider = void 0;
const vscode_1 = __webpack_require__(1);
const RegisterItem_1 = __webpack_require__(4);
const LoginItem_1 = __webpack_require__(5);
const tokenUtils_1 = __webpack_require__(6);
const EmailItem_1 = __webpack_require__(8);
const ApiEndpointItem_1 = __webpack_require__(64);
class PiExtTreeDataProvider {
    onDidChangeTreeDataEmitter = new vscode_1.EventEmitter();
    onDidChangeTreeData = this.onDidChangeTreeDataEmitter.event;
    async getTreeItem(item) {
        return await item.getTreeItem();
    }
    async getChildren(item) {
        if (item) {
            return await item.getChildren?.();
        }
        else {
            const tokenRecord = await (0, tokenUtils_1.getAuthTokenRecord)();
            const emails = Object.keys(tokenRecord);
            if (emails.length) {
                return emails.map(e => new EmailItem_1.EmailItem(e));
            }
            else {
                return [
                    new LoginItem_1.LoginItem(),
                    new RegisterItem_1.RegisterItem(),
                    new ApiEndpointItem_1.ApiEndpointItem(),
                ];
            }
        }
    }
    refresh(item) {
        this.onDidChangeTreeDataEmitter.fire(item);
    }
}
exports.PiExtTreeDataProvider = PiExtTreeDataProvider;


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegisterItem = void 0;
const vscode_1 = __webpack_require__(1);
const createPlatformAccount = vscode_1.l10n.t('Create an account...');
class RegisterItem extends vscode_1.TreeItem {
    static contextValue = 'registerItem';
    static regExp = new RegExp(RegisterItem.contextValue);
    constructor() {
        super(createPlatformAccount);
    }
    getTreeItem() {
        return {
            id: '/register',
            label: this.label,
            description: vscode_1.l10n.t('Register'),
            contextValue: RegisterItem.contextValue,
            iconPath: new vscode_1.ThemeIcon("plus", "white"),
            command: {
                title: createPlatformAccount,
                command: 'portfolioInstruments.register',
                tooltip: vscode_1.l10n.t('Register'),
            }
        };
    }
}
exports.RegisterItem = RegisterItem;


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginItem = void 0;
const vscode_1 = __webpack_require__(1);
const loginPlatformAccount = vscode_1.l10n.t('Sign in...');
class LoginItem extends vscode_1.TreeItem {
    static contextValue = 'loginItem';
    static regExp = new RegExp(LoginItem.contextValue);
    constructor() {
        super(loginPlatformAccount);
    }
    getTreeItem() {
        return {
            id: '/login',
            label: this.label,
            description: vscode_1.l10n.t('Login'),
            contextValue: LoginItem.contextValue,
            iconPath: new vscode_1.ThemeIcon('log-in', 'white'),
            command: {
                title: loginPlatformAccount,
                command: 'portfolioInstruments.login',
                tooltip: vscode_1.l10n.t('Login'),
            }
        };
    }
}
exports.LoginItem = LoginItem;


/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getAuthToken = getAuthToken;
exports.storeAuthToken = storeAuthToken;
exports.removeAuthToken = removeAuthToken;
exports.hasAuthTokenRecord = hasAuthTokenRecord;
exports.getAuthTokenRecord = getAuthTokenRecord;
exports.removeAuthTokenRecord = removeAuthTokenRecord;
const extensionVariables_1 = __webpack_require__(2);
const constants_1 = __webpack_require__(7);
async function getAuthToken(email) {
    email = email.toLowerCase();
    const tokenRecord = await getAuthTokenRecord();
    return tokenRecord[email];
}
async function storeAuthToken(email, token) {
    email = email.toLowerCase();
    const secrets = extensionVariables_1.ext.context.secrets;
    const tokenRecord = await getAuthTokenRecord();
    tokenRecord[email] = token;
    return await secrets.store(constants_1.tokenStorageKey, JSON.stringify(tokenRecord));
}
async function removeAuthToken(email) {
    email = email.toLowerCase();
    const tokenRecord = await getAuthTokenRecord();
    delete tokenRecord[email];
    const secrets = extensionVariables_1.ext.context.secrets;
    await secrets.store(constants_1.tokenStorageKey, JSON.stringify(tokenRecord));
}
async function hasAuthTokenRecord() {
    return !!Object.keys((await getAuthTokenRecord())).length;
}
async function getAuthTokenRecord() {
    const secrets = extensionVariables_1.ext.context.secrets;
    const tokenStrings = await secrets.get(constants_1.tokenStorageKey);
    return tokenStrings ? JSON.parse(tokenStrings) : {};
}
async function removeAuthTokenRecord() {
    const secrets = extensionVariables_1.ext.context.secrets;
    await secrets.delete(constants_1.tokenStorageKey);
}


/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.operationCancelled = exports.viewPropertiesContext = exports.reorderableContext = exports.reordererContext = exports.tokenStorageKey = exports.orderKeyPrefix = exports.latestApiVersion = void 0;
const vscode_1 = __webpack_require__(1);
exports.latestApiVersion = 'v2';
exports.orderKeyPrefix = 'pi-order:';
exports.tokenStorageKey = 'pi-token-storage';
exports.reordererContext = 'reorderer';
exports.reorderableContext = 'reorderable';
exports.viewPropertiesContext = 'viewProperties';
exports.operationCancelled = vscode_1.l10n.t('Operation cancelled');


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.EmailItem = void 0;
const vscode_1 = __webpack_require__(1);
const AccountsItem_1 = __webpack_require__(9);
const getUserByToken_1 = __webpack_require__(18);
const nonNull_1 = __webpack_require__(12);
const tokenUtils_1 = __webpack_require__(6);
const GenericItem_1 = __webpack_require__(19);
const HoldingsItem_1 = __webpack_require__(20);
const BenchmarksItem_1 = __webpack_require__(24);
const SnapshotsItem_1 = __webpack_require__(28);
const extensionVariables_1 = __webpack_require__(2);
class EmailItem extends vscode_1.TreeItem {
    static contextValue = 'emailItem';
    static regExp = new RegExp(EmailItem.contextValue);
    email;
    constructor(email) {
        super(email);
        this.email = email;
    }
    getTreeItem() {
        return {
            id: `/users/${this.label}`,
            label: this.label,
            description: vscode_1.l10n.t('Email'),
            contextValue: EmailItem.contextValue,
            collapsibleState: vscode_1.TreeItemCollapsibleState.Collapsed,
            iconPath: new vscode_1.ThemeIcon("account", "white"),
        };
    }
    async getChildren() {
        const response = await (0, getUserByToken_1.getUserByToken)((0, nonNull_1.nonNullValue)(await (0, tokenUtils_1.getAuthToken)(this.email)));
        if (response.data) {
            extensionVariables_1.ext.resourceCache.set(EmailItem.generatePiExtUserId(this.email), response.data?.user);
            return [
                new SnapshotsItem_1.SnapshotsItem(this.email),
                new AccountsItem_1.AccountsItem(this.email),
                new HoldingsItem_1.HoldingsItem(this.email),
                new BenchmarksItem_1.BenchmarksItem(this.email),
            ];
        }
        else {
            return [
                new GenericItem_1.GenericItem({
                    id: `/users/${this.email}/refreshLogin`,
                    label: vscode_1.l10n.t('Credentials are stale. Refresh login to proceed.'),
                    contextValue: 'refreshLoginItem',
                    command: {
                        title: 'Refresh login...',
                        command: 'portfolioInstruments.refreshLogin',
                        arguments: [this],
                    }
                }),
            ];
        }
    }
    static async getUser(email) {
        return (0, nonNull_1.nonNullValueAndProp)(await (0, getUserByToken_1.getUserByToken)((0, nonNull_1.nonNullValue)(await (0, tokenUtils_1.getAuthToken)(email))), 'data').user;
    }
    static async getUserWithCache(email) {
        let user = extensionVariables_1.ext.resourceCache.get(EmailItem.generatePiExtUserId(email));
        if (!user) {
            user = await EmailItem.getUser(email);
            extensionVariables_1.ext.resourceCache.set(EmailItem.generatePiExtUserId(email), user);
        }
        return user;
    }
    static generatePiExtUserId(email) {
        return `/users/${email}`;
    }
}
exports.EmailItem = EmailItem;


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountsItem = void 0;
const vscode_1 = __webpack_require__(1);
const getAccounts_1 = __webpack_require__(10);
const tokenUtils_1 = __webpack_require__(6);
const nonNull_1 = __webpack_require__(12);
const AccountItem_1 = __webpack_require__(13);
const AccountDeprecatedItem_1 = __webpack_require__(16);
const contextUtils_1 = __webpack_require__(14);
const constants_1 = __webpack_require__(7);
const extensionVariables_1 = __webpack_require__(2);
const reorder_1 = __webpack_require__(17);
const settingUtils_1 = __webpack_require__(11);
class AccountsItem extends vscode_1.TreeItem {
    email;
    static contextValue = 'accountsItem';
    static regExp = new RegExp(AccountsItem.contextValue);
    id;
    kind = 'accounts';
    refreshedChildOrder = false;
    constructor(email) {
        super(vscode_1.l10n.t('Accounts'));
        this.email = email;
        this.id = `/users/${email}/accounts`;
        this.contextValue = (0, contextUtils_1.createContextValue)([AccountsItem.contextValue, constants_1.reordererContext, constants_1.viewPropertiesContext]);
    }
    getTreeItem() {
        return {
            id: this.id,
            label: this.label,
            contextValue: this.contextValue,
            collapsibleState: vscode_1.TreeItemCollapsibleState.Collapsed,
            iconPath: new vscode_1.ThemeIcon('home', 'white'),
        };
    }
    async getChildren() {
        let accounts;
        if (this.refreshedChildOrder) {
            // We generally want to refresh the cache
            // However, if we know the node was refreshed due to having been reordered, no need to re-fetch
            accounts = await AccountsItem.getAccountsWithCache(this.email);
            this.refreshedChildOrder = false;
        }
        else {
            accounts = await AccountsItem.getAccounts(this.email);
        }
        const showDeprecated = settingUtils_1.settingUtils.getShowDeprecatedResources();
        // Separate deprecated and non-deprecated accounts
        const nonDeprecatedAccounts = accounts.filter(a => !a.is_deprecated);
        const deprecatedAccounts = showDeprecated ? accounts.filter(a => a.is_deprecated) : [];
        const orderedAccounts = await this.getOrderedResourceModels(nonDeprecatedAccounts);
        // Cache all accounts (both deprecated and non-deprecated) to preserve deprecated items after reordering
        const allAccounts = [...orderedAccounts, ...accounts.filter(a => a.is_deprecated)];
        extensionVariables_1.ext.resourceCache.set(AccountsItem.generatePiExtAccountsId(this.email), allAccounts);
        const items = orderedAccounts.map(a => new AccountItem_1.AccountItem(this, this.email, a));
        // Add deprecated accounts at the end
        if (deprecatedAccounts.length > 0) {
            items.push(...deprecatedAccounts.map(a => new AccountDeprecatedItem_1.AccountDeprecatedItem(this, this.email, a)));
        }
        return items;
    }
    canReorderItem(item) {
        return !!item.contextValue?.includes(AccountItem_1.AccountItem.contextValue);
    }
    async getOrderedResourceModels(accounts) {
        accounts ??= await AccountsItem.getAccountsWithCache(this.email);
        const accountResourceModels = accounts.map(a => (0, reorder_1.convertToGenericPiResourceModel)(a, 'account_id'));
        const orderedResourceIds = extensionVariables_1.ext.context.globalState.get(AccountsItem.generatePiExtAccountsOrderId(this.email)) ?? [];
        return (0, reorder_1.orderResourcesByTargetIds)(accountResourceModels, orderedResourceIds);
    }
    async reorderChildrenByTargetResourceModelIds(ids) {
        this.refreshedChildOrder = true;
        await extensionVariables_1.ext.context.globalState.update(AccountsItem.generatePiExtAccountsOrderId(this.email), ids);
        extensionVariables_1.ext.portfolioInstrumentsTdp.refresh(this);
    }
    async viewProperties() {
        const accounts = await AccountsItem.getAccountsWithCache(this.email);
        const showDeprecated = settingUtils_1.settingUtils.getShowDeprecatedResources();
        // Separate deprecated and non-deprecated accounts
        const nonDeprecatedAccounts = accounts.filter(a => !a.is_deprecated);
        const deprecatedAccounts = showDeprecated ? accounts.filter(a => a.is_deprecated) : [];
        // Order non-deprecated accounts and append deprecated ones at the end
        const orderedAccounts = await this.getOrderedResourceModels(nonDeprecatedAccounts);
        const result = [...orderedAccounts, ...deprecatedAccounts];
        // Remove id field from all accounts
        const resultWithoutId = result.map(({ id, ...account }) => account);
        return JSON.stringify(resultWithoutId, undefined, 4);
    }
    static async getAccounts(email) {
        const response = await (0, getAccounts_1.getAccounts)((0, nonNull_1.nonNullValue)(await (0, tokenUtils_1.getAuthToken)(email)));
        return response.data?.accounts ?? [];
    }
    static async getAccountsWithCache(email) {
        const cachedAccounts = extensionVariables_1.ext.resourceCache.get(AccountsItem.generatePiExtAccountsId(email));
        const accounts = cachedAccounts ?? await AccountsItem.getAccounts(email);
        if (!cachedAccounts) {
            extensionVariables_1.ext.resourceCache.set(AccountsItem.generatePiExtAccountsId(email), accounts);
        }
        return accounts;
    }
    static generatePiExtAccountsId(email) {
        return `/users/${email}/accounts/`;
    }
    static generatePiExtAccountsOrderId(email) {
        return constants_1.orderKeyPrefix + AccountsItem.generatePiExtAccountsId(email);
    }
}
exports.AccountsItem = AccountsItem;


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getAccounts = getAccounts;
const constants_1 = __webpack_require__(7);
const settingUtils_1 = __webpack_require__(11);
async function getAccounts(token) {
    const response = await fetch(`${settingUtils_1.settingUtils.getApiEndpointBaseUrl()}/api/${constants_1.latestApiVersion}/accounts`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return await response.json();
}


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.settingUtils = void 0;
const vscode_1 = __webpack_require__(1);
const nonNull_1 = __webpack_require__(12);
var settingUtils;
(function (settingUtils) {
    const extPrefix = 'portfolioInstruments';
    const apiEndpointSetting = 'apiEndpoint';
    const showDeprecatedResourcesSetting = 'showDeprecatedResources';
    /**
     * Directly retrieves one of the user's `Global` configuration settings.
     * @param key The key of the setting to retrieve
     */
    function getGlobalSetting(key) {
        const projectConfiguration = vscode_1.workspace.getConfiguration(extPrefix);
        const result = projectConfiguration.inspect(key);
        return result?.globalValue === undefined ? result?.defaultValue : result?.globalValue;
    }
    settingUtils.getGlobalSetting = getGlobalSetting;
    /**
     * Directly updates one of the user's `Global` configuration settings.
     * @param key The key of the setting to update
     * @param value The value of the setting to update
     */
    async function updateGlobalSetting(key, value) {
        const projectConfiguration = vscode_1.workspace.getConfiguration(extPrefix);
        await projectConfiguration.update(key, value, vscode_1.ConfigurationTarget.Global);
    }
    settingUtils.updateGlobalSetting = updateGlobalSetting;
    function getApiEndpointBaseUrl() {
        return (0, nonNull_1.nonNullValue)(getGlobalSetting(apiEndpointSetting), 'Could not determine a valid api endpoint from user settings.');
    }
    settingUtils.getApiEndpointBaseUrl = getApiEndpointBaseUrl;
    async function updateApiEndpointBaseUrl(newBaseUrl) {
        await updateGlobalSetting(apiEndpointSetting, newBaseUrl);
    }
    settingUtils.updateApiEndpointBaseUrl = updateApiEndpointBaseUrl;
    function getShowDeprecatedResources() {
        return getGlobalSetting(showDeprecatedResourcesSetting) ?? false;
    }
    settingUtils.getShowDeprecatedResources = getShowDeprecatedResources;
    async function updateShowDeprecatedResources(show) {
        await updateGlobalSetting(showDeprecatedResourcesSetting, show);
    }
    settingUtils.updateShowDeprecatedResources = updateShowDeprecatedResources;
})(settingUtils || (exports.settingUtils = settingUtils = {}));


/***/ }),
/* 12 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.nonNullProp = nonNullProp;
exports.nonNullValue = nonNullValue;
exports.nonNullValueAndProp = nonNullValueAndProp;
function nonNullProp(source, name) {
    const value = source[name];
    return nonNullValue(value, name);
}
function nonNullValue(value, propertyNameOrMessage) {
    if (isNullOrUndefined(value)) {
        throw new Error('Internal error: Expected value to be neither null nor undefined'
            + (propertyNameOrMessage ? `: ${propertyNameOrMessage}` : ''));
    }
    return value;
}
function nonNullValueAndProp(source, name) {
    return nonNullProp(nonNullValue(source, name), name);
}
function isNullOrUndefined(value) {
    return value === null || value === undefined;
}


/***/ }),
/* 13 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountItem = void 0;
const vscode_1 = __webpack_require__(1);
const contextUtils_1 = __webpack_require__(14);
const constants_1 = __webpack_require__(7);
const textUtils_1 = __webpack_require__(15);
class AccountItem extends vscode_1.TreeItem {
    parent;
    email;
    account;
    static contextValue = 'accountItem';
    static regExp = new RegExp(AccountItem.contextValue);
    id;
    kind = 'account';
    contextValue;
    constructor(parent, email, account) {
        super(account.name);
        this.parent = parent;
        this.email = email;
        this.account = account;
        this.id = `/users/${email}/accounts/${account.account_id}`;
        this.contextValue = (0, contextUtils_1.createContextValue)([AccountItem.contextValue, constants_1.reorderableContext, constants_1.viewPropertiesContext]);
    }
    getTreeItem() {
        return {
            id: this.id,
            label: this.label,
            description: `${(0, textUtils_1.capitalize)(this.account.institution)}-${(0, textUtils_1.capitalize)(this.account.tax_shelter)}`,
            contextValue: this.contextValue,
            iconPath: new vscode_1.ThemeIcon('home', 'white'),
        };
    }
    async viewProperties() {
        const { id, ...accountWithoutId } = this.account;
        return JSON.stringify(accountWithoutId, undefined, 4);
    }
    getResourceId() {
        return this.account.account_id.toString();
    }
}
exports.AccountItem = AccountItem;


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createContextValue = createContextValue;
function createContextValue(values) {
    return Array.from(new Set(values)).sort().join(';');
}


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.capitalize = capitalize;
function capitalize(value) {
    return value.slice(0, 1).toUpperCase() + value.slice(1, value.length).toLowerCase();
}


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountDeprecatedItem = void 0;
const vscode_1 = __webpack_require__(1);
const contextUtils_1 = __webpack_require__(14);
const constants_1 = __webpack_require__(7);
const textUtils_1 = __webpack_require__(15);
class AccountDeprecatedItem extends vscode_1.TreeItem {
    parent;
    email;
    account;
    static contextValue = 'accountDeprecatedItem';
    static regExp = new RegExp(AccountDeprecatedItem.contextValue);
    id;
    kind = 'account';
    contextValue;
    constructor(parent, email, account) {
        super(account.name);
        this.parent = parent;
        this.email = email;
        this.account = account;
        this.id = `/users/${email}/accounts/${account.account_id}`;
        this.contextValue = (0, contextUtils_1.createContextValue)([AccountDeprecatedItem.contextValue, constants_1.viewPropertiesContext]);
    }
    getTreeItem() {
        return {
            id: this.id,
            label: this.label,
            description: `${(0, textUtils_1.capitalize)(this.account.institution)}-${(0, textUtils_1.capitalize)(this.account.tax_shelter)} ${vscode_1.l10n.t('(deprecated)')}`,
            contextValue: this.contextValue,
            iconPath: new vscode_1.ThemeIcon('home', 'white'),
        };
    }
    async viewProperties() {
        return JSON.stringify(this.account, undefined, 4);
    }
}
exports.AccountDeprecatedItem = AccountDeprecatedItem;


/***/ }),
/* 17 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.isReorderer = isReorderer;
exports.isReorderable = isReorderable;
exports.convertToGenericPiResourceModel = convertToGenericPiResourceModel;
exports.orderResourcesByTargetIds = orderResourcesByTargetIds;
const constants_1 = __webpack_require__(7);
function isReorderer(item) {
    return !!item.contextValue?.includes(constants_1.reordererContext);
}
function isReorderable(item) {
    return !!item.contextValue?.includes(constants_1.reorderableContext);
}
function convertToGenericPiResourceModel(resource, idProp) {
    return {
        ...resource,
        id: String(resource[idProp]),
    };
}
function orderResourcesByTargetIds(currentResources, orderedTargetIds) {
    const resourceMap = new Map();
    for (const resource of currentResources) {
        resourceMap.set(resource.id, resource);
    }
    const orderedResources = [];
    // Order what we can according to targetIds
    for (const targetId of orderedTargetIds) {
        const resource = resourceMap.get(targetId);
        if (!resource) {
            continue;
        }
        orderedResources.push(resource);
        resourceMap.delete(targetId);
    }
    // For whatever is remaining, just add those resources to the end
    for (const resource of resourceMap.values()) {
        orderedResources.push(resource);
    }
    return orderedResources;
}


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getUserByToken = getUserByToken;
const constants_1 = __webpack_require__(7);
const settingUtils_1 = __webpack_require__(11);
async function getUserByToken(token) {
    const response = await fetch(`${settingUtils_1.settingUtils.getApiEndpointBaseUrl()}/api/${constants_1.latestApiVersion}/me`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return await response.json();
}


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GenericItem = void 0;
const vscode_1 = __webpack_require__(1);
class GenericItem extends vscode_1.TreeItem {
    constructor(options) {
        super(options.label);
        this.id = options.id;
        this.command = options.command;
        this.iconPath = options.iconPath;
        this.description = options.description;
        this.contextValue = options.contextValue;
        this.collapsibleState = options.collapsibleState;
    }
    getTreeItem() {
        return {
            id: this.id,
            label: this.label,
            command: this.command,
            iconPath: this.iconPath,
            description: this.description,
            contextValue: this.contextValue,
            collapsibleState: this.collapsibleState,
        };
    }
}
exports.GenericItem = GenericItem;


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HoldingsItem = void 0;
const vscode_1 = __webpack_require__(1);
const tokenUtils_1 = __webpack_require__(6);
const nonNull_1 = __webpack_require__(12);
const getHoldings_1 = __webpack_require__(21);
const HoldingItem_1 = __webpack_require__(22);
const HoldingDeprecatedItem_1 = __webpack_require__(23);
const constants_1 = __webpack_require__(7);
const contextUtils_1 = __webpack_require__(14);
const extensionVariables_1 = __webpack_require__(2);
const reorder_1 = __webpack_require__(17);
const settingUtils_1 = __webpack_require__(11);
class HoldingsItem extends vscode_1.TreeItem {
    email;
    static contextValue = 'holdingsItem';
    static regExp = new RegExp(HoldingsItem.contextValue);
    id;
    kind = 'holdings';
    refreshedChildOrder = false;
    constructor(email) {
        super(vscode_1.l10n.t('Holdings'));
        this.email = email;
        this.id = `/users/${email}/holdings`;
        this.contextValue = (0, contextUtils_1.createContextValue)([HoldingsItem.contextValue, constants_1.reordererContext, constants_1.viewPropertiesContext]);
    }
    getTreeItem() {
        return {
            id: this.id,
            label: this.label,
            contextValue: this.contextValue,
            collapsibleState: vscode_1.TreeItemCollapsibleState.Collapsed,
            iconPath: new vscode_1.ThemeIcon("variable", "white"),
        };
    }
    async getChildren() {
        let holdings;
        if (this.refreshedChildOrder) {
            // We generally want to refresh the cache
            // However, if we know the node was refreshed due to having been reordered, no need to re-fetch
            holdings = await HoldingsItem.getHoldingsWithCache(this.email);
            this.refreshedChildOrder = false;
        }
        else {
            holdings = await HoldingsItem.getHoldings(this.email);
        }
        const showDeprecated = settingUtils_1.settingUtils.getShowDeprecatedResources();
        // Separate deprecated and non-deprecated holdings
        const nonDeprecatedHoldings = holdings.filter(h => !h.is_deprecated);
        const deprecatedHoldings = showDeprecated ? holdings.filter(h => h.is_deprecated) : [];
        const orderedHoldings = await this.getOrderedResourceModels(nonDeprecatedHoldings);
        // Cache all holdings (both deprecated and non-deprecated) to preserve deprecated items after reordering
        const allHoldings = [...orderedHoldings, ...holdings.filter(h => h.is_deprecated)];
        extensionVariables_1.ext.resourceCache.set(HoldingsItem.generatePiExtHoldingsId(this.email), allHoldings);
        const items = orderedHoldings.map(h => new HoldingItem_1.HoldingItem(this, this.email, h));
        // Add deprecated holdings at the end
        if (deprecatedHoldings.length > 0) {
            items.push(...deprecatedHoldings.map(h => new HoldingDeprecatedItem_1.HoldingDeprecatedItem(this, this.email, h)));
        }
        return items;
    }
    canReorderItem(item) {
        return !!item.contextValue?.includes(HoldingItem_1.HoldingItem.contextValue);
    }
    async getOrderedResourceModels(holdings) {
        holdings ??= await HoldingsItem.getHoldingsWithCache(this.email);
        const holdingResourceModels = holdings.map(h => (0, reorder_1.convertToGenericPiResourceModel)(h, 'holding_id'));
        const orderedResourceIds = extensionVariables_1.ext.context.globalState.get(HoldingsItem.generatePiExtHoldingsOrderId(this.email)) ?? [];
        return (0, reorder_1.orderResourcesByTargetIds)(holdingResourceModels, orderedResourceIds);
    }
    async reorderChildrenByTargetResourceModelIds(ids) {
        this.refreshedChildOrder = true;
        await extensionVariables_1.ext.context.globalState.update(HoldingsItem.generatePiExtHoldingsOrderId(this.email), ids);
        extensionVariables_1.ext.portfolioInstrumentsTdp.refresh(this);
    }
    async viewProperties() {
        const holdings = await HoldingsItem.getHoldingsWithCache(this.email);
        const showDeprecated = settingUtils_1.settingUtils.getShowDeprecatedResources();
        // Separate deprecated and non-deprecated holdings
        const nonDeprecatedHoldings = holdings.filter(h => !h.is_deprecated);
        const deprecatedHoldings = showDeprecated ? holdings.filter(h => h.is_deprecated) : [];
        // Order non-deprecated holdings and append deprecated ones at the end
        const orderedHoldings = await this.getOrderedResourceModels(nonDeprecatedHoldings);
        const result = [...orderedHoldings, ...deprecatedHoldings];
        // Remove id field from all holdings
        const resultWithoutId = result.map(({ id, ...holding }) => holding);
        return JSON.stringify(resultWithoutId, undefined, 4);
    }
    static async getHoldings(email) {
        const response = await (0, getHoldings_1.getHoldings)((0, nonNull_1.nonNullValue)(await (0, tokenUtils_1.getAuthToken)(email)));
        return response.data?.holdings ?? [];
    }
    static async getHoldingsWithCache(email) {
        const cachedHoldings = extensionVariables_1.ext.resourceCache.get(HoldingsItem.generatePiExtHoldingsId(email));
        const holdings = cachedHoldings ?? await HoldingsItem.getHoldings(email);
        if (!cachedHoldings) {
            extensionVariables_1.ext.resourceCache.set(HoldingsItem.generatePiExtHoldingsId(email), holdings);
        }
        return holdings;
    }
    static generatePiExtHoldingsId(email) {
        return `/users/${email}/holdings`;
    }
    static generatePiExtHoldingsOrderId(email) {
        return constants_1.orderKeyPrefix + HoldingsItem.generatePiExtHoldingsId(email);
    }
}
exports.HoldingsItem = HoldingsItem;


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getHoldings = getHoldings;
const constants_1 = __webpack_require__(7);
const settingUtils_1 = __webpack_require__(11);
async function getHoldings(token) {
    const response = await fetch(`${settingUtils_1.settingUtils.getApiEndpointBaseUrl()}/api/${constants_1.latestApiVersion}/holdings`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return await response.json();
}


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HoldingItem = void 0;
const vscode_1 = __webpack_require__(1);
const contextUtils_1 = __webpack_require__(14);
const constants_1 = __webpack_require__(7);
class HoldingItem extends vscode_1.TreeItem {
    parent;
    email;
    holding;
    static contextValue = 'holdingItem';
    static regExp = new RegExp(HoldingItem.contextValue);
    id;
    kind = 'holding';
    contextValue;
    constructor(parent, email, holding) {
        super(holding.name);
        this.parent = parent;
        this.email = email;
        this.holding = holding;
        this.id = `/users/${email}/holdings/${holding.holding_id}`;
        this.contextValue = (0, contextUtils_1.createContextValue)([HoldingItem.contextValue, constants_1.reorderableContext, constants_1.viewPropertiesContext]);
    }
    getTreeItem() {
        return {
            id: this.id,
            label: this.label,
            description: this.holding.asset_category,
            contextValue: this.contextValue,
            iconPath: new vscode_1.ThemeIcon("variable", "white"),
        };
    }
    viewProperties() {
        const { id, ...holdingWithoutId } = this.holding;
        return JSON.stringify(holdingWithoutId, undefined, 4);
    }
    getResourceId() {
        return this.holding.holding_id.toString();
    }
}
exports.HoldingItem = HoldingItem;


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HoldingDeprecatedItem = void 0;
const vscode_1 = __webpack_require__(1);
const contextUtils_1 = __webpack_require__(14);
const constants_1 = __webpack_require__(7);
class HoldingDeprecatedItem extends vscode_1.TreeItem {
    parent;
    email;
    holding;
    static contextValue = 'holdingDeprecatedItem';
    static regExp = new RegExp(HoldingDeprecatedItem.contextValue);
    id;
    kind = 'holding';
    contextValue;
    constructor(parent, email, holding) {
        super(holding.name);
        this.parent = parent;
        this.email = email;
        this.holding = holding;
        this.id = `/users/${email}/holdings/${holding.holding_id}`;
        this.contextValue = (0, contextUtils_1.createContextValue)([HoldingDeprecatedItem.contextValue, constants_1.viewPropertiesContext]);
    }
    getTreeItem() {
        return {
            id: this.id,
            label: this.label,
            description: `${this.holding.asset_category} ${vscode_1.l10n.t('(deprecated)')}`,
            contextValue: this.contextValue,
            iconPath: new vscode_1.ThemeIcon("variable", "white"),
        };
    }
    viewProperties() {
        return JSON.stringify(this.holding, undefined, 4);
    }
}
exports.HoldingDeprecatedItem = HoldingDeprecatedItem;


/***/ }),
/* 24 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BenchmarksItem = void 0;
const vscode_1 = __webpack_require__(1);
const tokenUtils_1 = __webpack_require__(6);
const nonNull_1 = __webpack_require__(12);
const contextUtils_1 = __webpack_require__(14);
const constants_1 = __webpack_require__(7);
const getBenchmarks_1 = __webpack_require__(25);
const BenchmarkItem_1 = __webpack_require__(26);
const BenchmarkDeprecatedItem_1 = __webpack_require__(27);
const extensionVariables_1 = __webpack_require__(2);
const settingUtils_1 = __webpack_require__(11);
class BenchmarksItem extends vscode_1.TreeItem {
    email;
    static contextValue = 'benchmarksItem';
    static regExp = new RegExp(BenchmarksItem.contextValue);
    id;
    constructor(email) {
        super(vscode_1.l10n.t('Benchmarks'));
        this.email = email;
        this.id = `/users/${email}/benchmarks`;
    }
    getTreeItem() {
        return {
            id: this.id,
            label: this.label,
            contextValue: this.getContextValue(),
            collapsibleState: vscode_1.TreeItemCollapsibleState.Collapsed,
            iconPath: new vscode_1.ThemeIcon('pie-chart', 'white'),
        };
    }
    async getChildren() {
        const benchmarks = await BenchmarksItem.getBenchmarks(this.email);
        extensionVariables_1.ext.resourceCache.set(BenchmarksItem.generatePiExtBenchmarksId(this.email), benchmarks);
        const showDeprecated = settingUtils_1.settingUtils.getShowDeprecatedResources();
        // Separate deprecated and non-deprecated benchmarks
        const nonDeprecatedBenchmarks = benchmarks.filter(b => !b.is_deprecated);
        const deprecatedBenchmarks = showDeprecated ? benchmarks.filter(b => b.is_deprecated) : [];
        const items = nonDeprecatedBenchmarks.map(b => new BenchmarkItem_1.BenchmarkItem(this, this.email, b));
        // Add deprecated benchmarks at the end
        if (deprecatedBenchmarks.length > 0) {
            items.push(...deprecatedBenchmarks.map(b => new BenchmarkDeprecatedItem_1.BenchmarkDeprecatedItem(this, this.email, b)));
        }
        return items;
    }
    getContextValue() {
        return (0, contextUtils_1.createContextValue)([BenchmarksItem.contextValue, constants_1.viewPropertiesContext]);
    }
    async viewProperties() {
        const benchmarks = await BenchmarksItem.getBenchmarksWithCache(this.email);
        const showDeprecated = settingUtils_1.settingUtils.getShowDeprecatedResources();
        // Separate deprecated and non-deprecated benchmarks
        const nonDeprecatedBenchmarks = benchmarks.filter(b => !b.is_deprecated);
        const deprecatedBenchmarks = showDeprecated ? benchmarks.filter(b => b.is_deprecated) : [];
        // Combine non-deprecated and deprecated benchmarks, with deprecated at the end
        const result = [...nonDeprecatedBenchmarks, ...deprecatedBenchmarks];
        return JSON.stringify(result, undefined, 4);
    }
    static async getBenchmarks(email) {
        const response = await (0, getBenchmarks_1.getBenchmarks)((0, nonNull_1.nonNullValue)(await (0, tokenUtils_1.getAuthToken)(email)));
        return response.data?.benchmarks ?? [];
    }
    static async getBenchmarksWithCache(email) {
        const cachedBenchmarks = extensionVariables_1.ext.resourceCache.get(BenchmarksItem.generatePiExtBenchmarksId(email));
        const benchmarks = cachedBenchmarks ?? await BenchmarksItem.getBenchmarks(email);
        if (!cachedBenchmarks) {
            extensionVariables_1.ext.resourceCache.set(BenchmarksItem.generatePiExtBenchmarksId(email), benchmarks);
        }
        return benchmarks;
    }
    static generatePiExtBenchmarksId(email) {
        return `/users/${email}/benchmarks`;
    }
}
exports.BenchmarksItem = BenchmarksItem;


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getBenchmarks = getBenchmarks;
const constants_1 = __webpack_require__(7);
const settingUtils_1 = __webpack_require__(11);
async function getBenchmarks(token) {
    const response = await fetch(`${settingUtils_1.settingUtils.getApiEndpointBaseUrl()}/api/${constants_1.latestApiVersion}/benchmarks`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return await response.json();
}


/***/ }),
/* 26 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BenchmarkItem = void 0;
const vscode_1 = __webpack_require__(1);
const contextUtils_1 = __webpack_require__(14);
const constants_1 = __webpack_require__(7);
class BenchmarkItem extends vscode_1.TreeItem {
    parent;
    email;
    benchmark;
    static contextValue = 'benchmarkItem';
    static regExp = new RegExp(BenchmarkItem.contextValue);
    id;
    constructor(parent, email, benchmark) {
        super(benchmark.name);
        this.parent = parent;
        this.email = email;
        this.benchmark = benchmark;
        this.id = `/users/${email}/benchmarks/${benchmark.benchmark_id}`;
    }
    getTreeItem() {
        return {
            id: this.id,
            label: this.label,
            description: this.benchmark.asset_allocation.map(a => a.percent).sort((a, b) => b - a).join('% / ') + '%',
            contextValue: this.getContextValue(),
            iconPath: new vscode_1.ThemeIcon('pie-chart', 'white'),
        };
    }
    getContextValue() {
        return (0, contextUtils_1.createContextValue)([BenchmarkItem.contextValue, constants_1.viewPropertiesContext]);
    }
    async viewProperties() {
        return JSON.stringify(this.benchmark, undefined, 4);
    }
}
exports.BenchmarkItem = BenchmarkItem;


/***/ }),
/* 27 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BenchmarkDeprecatedItem = void 0;
const vscode_1 = __webpack_require__(1);
const contextUtils_1 = __webpack_require__(14);
const constants_1 = __webpack_require__(7);
class BenchmarkDeprecatedItem extends vscode_1.TreeItem {
    parent;
    email;
    benchmark;
    static contextValue = 'benchmarkDeprecatedItem';
    static regExp = new RegExp(BenchmarkDeprecatedItem.contextValue);
    id;
    constructor(parent, email, benchmark) {
        super(benchmark.name);
        this.parent = parent;
        this.email = email;
        this.benchmark = benchmark;
        this.id = `/users/${email}/benchmarks/${benchmark.benchmark_id}`;
    }
    getTreeItem() {
        return {
            id: this.id,
            label: this.label,
            description: this.benchmark.asset_allocation.map(a => a.percent).sort((a, b) => b - a).join('% / ') + `% ${vscode_1.l10n.t('(deprecated)')}`,
            contextValue: this.getContextValue(),
            iconPath: new vscode_1.ThemeIcon('pie-chart', 'white'),
        };
    }
    getContextValue() {
        return (0, contextUtils_1.createContextValue)([BenchmarkDeprecatedItem.contextValue, constants_1.viewPropertiesContext]);
    }
    async viewProperties() {
        return JSON.stringify(this.benchmark, undefined, 4);
    }
}
exports.BenchmarkDeprecatedItem = BenchmarkDeprecatedItem;


/***/ }),
/* 28 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotsItem = void 0;
const vscode_1 = __webpack_require__(1);
const nonNull_1 = __webpack_require__(12);
const tokenUtils_1 = __webpack_require__(6);
const contextUtils_1 = __webpack_require__(14);
const constants_1 = __webpack_require__(7);
const getSnapshots_1 = __webpack_require__(29);
const SnapshotItem_1 = __webpack_require__(30);
const extensionVariables_1 = __webpack_require__(2);
const SnapshotDraftItem_1 = __webpack_require__(58);
class SnapshotsItem extends vscode_1.TreeItem {
    email;
    static contextValue = 'snapshotsItem';
    static regExp = new RegExp(SnapshotsItem.contextValue);
    page;
    constructor(email) {
        super(vscode_1.l10n.t('Snapshots'));
        this.email = email;
        this.email = email;
        this.id = `/users/${email}/snapshots`;
        this.page = Number(extensionVariables_1.ext.context.globalState.get(SnapshotsItem.generatePiExtSnapshotId(this.email)) ?? 1);
    }
    getTreeItem() {
        this.page = Number(extensionVariables_1.ext.context.globalState.get(SnapshotsItem.generatePiExtSnapshotId(this.email)) ?? 1);
        return {
            id: this.id,
            label: this.label,
            description: `Page ${this.page}`,
            contextValue: this.getContextValue(),
            collapsibleState: vscode_1.TreeItemCollapsibleState.Collapsed,
            iconPath: new vscode_1.ThemeIcon("device-camera", "white"),
        };
    }
    async getChildren() {
        let snapshotDraft;
        if (extensionVariables_1.ext.snapshotDraftFileSystem.hasSnapshotDraft(this.email)) {
            snapshotDraft = extensionVariables_1.ext.snapshotDraftFileSystem.parseSnapshotDraft(this.email);
        }
        const snapshots = await this.getSnapshots();
        return snapshotDraft ?
            [
                new SnapshotDraftItem_1.SnapshotDraftItem(this, this.email, { ...snapshotDraft, snapshot_values: undefined }, snapshotDraft.snapshot_values),
                ...snapshots.map(s => new SnapshotItem_1.SnapshotItem(this, this.email, s))
            ] :
            snapshots.map(s => new SnapshotItem_1.SnapshotItem(this, this.email, s));
    }
    getContextValue() {
        return (0, contextUtils_1.createContextValue)([SnapshotsItem.contextValue, constants_1.viewPropertiesContext]);
    }
    async getSnapshots() {
        const response = await (0, getSnapshots_1.getSnapshots)((0, nonNull_1.nonNullValue)(await (0, tokenUtils_1.getAuthToken)(this.email)), this.page);
        return response.data?.snapshots ?? [];
    }
    async viewProperties() {
        const snapshots = await this.getSnapshots();
        return JSON.stringify(snapshots, undefined, 4);
    }
    incrementPage() {
        const page = (Number(extensionVariables_1.ext.context.globalState.get(SnapshotsItem.generatePiExtSnapshotId(this.email)) ?? 1)) + 1;
        extensionVariables_1.ext.context.globalState.update(SnapshotsItem.generatePiExtSnapshotId(this.email), page);
        extensionVariables_1.ext.portfolioInstrumentsTdp.refresh(this);
        return page;
    }
    decrementPage() {
        let page = Number(extensionVariables_1.ext.context.globalState.get(SnapshotsItem.generatePiExtSnapshotId(this.email)) ?? 1);
        if (page === 1) {
            return page;
        }
        page -= 1;
        extensionVariables_1.ext.context.globalState.update(SnapshotsItem.generatePiExtSnapshotId(this.email), page);
        extensionVariables_1.ext.portfolioInstrumentsTdp.refresh(this);
        return page;
    }
    static generatePiExtSnapshotId(email) {
        return `/users/${email}/snapshots`;
    }
}
exports.SnapshotsItem = SnapshotsItem;


/***/ }),
/* 29 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSnapshots = getSnapshots;
exports.getSnapshotsByDateRange = getSnapshotsByDateRange;
exports.getSnapshotsLatest = getSnapshotsLatest;
exports.getSnapshotsEarliest = getSnapshotsEarliest;
exports.getMostRecentSnapshotByDate = getMostRecentSnapshotByDate;
const constants_1 = __webpack_require__(7);
const settingUtils_1 = __webpack_require__(11);
async function getSnapshots(token, page) {
    const response = await fetch(`${settingUtils_1.settingUtils.getApiEndpointBaseUrl()}/api/${constants_1.latestApiVersion}/snapshots?order_date_by=DESC&current_page=${page}&page_size=10`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return await response.json();
}
async function getSnapshotsByDateRange(token, startDate, endDate) {
    const response = await fetch(`${settingUtils_1.settingUtils.getApiEndpointBaseUrl()}/api/${constants_1.latestApiVersion}/snapshots?order_date_by=DESC&snap_date_lower=${startDate}&snap_date_upper=${endDate}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return await response.json();
}
async function getSnapshotsLatest(token) {
    const response = await fetch(`${settingUtils_1.settingUtils.getApiEndpointBaseUrl()}/api/${constants_1.latestApiVersion}/snapshots?order_date_by=DESC&page_size=1`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return await response.json();
}
async function getSnapshotsEarliest(token) {
    const response = await fetch(`${settingUtils_1.settingUtils.getApiEndpointBaseUrl()}/api/${constants_1.latestApiVersion}/snapshots?order_date_by=ASC&page_size=1`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return await response.json();
}
async function getMostRecentSnapshotByDate(token, date) {
    const response = await fetch(`${settingUtils_1.settingUtils.getApiEndpointBaseUrl()}/api/${constants_1.latestApiVersion}/snapshots?order_date_by=DESC&snap_date_upper=${date}&page_size=1`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return await response.json();
}


/***/ }),
/* 30 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotItem = void 0;
const vscode_1 = __webpack_require__(1);
const contextUtils_1 = __webpack_require__(14);
const constants_1 = __webpack_require__(7);
const SnapshotDataItem_1 = __webpack_require__(31);
const nonNull_1 = __webpack_require__(12);
const tokenUtils_1 = __webpack_require__(6);
const getSnapshot_1 = __webpack_require__(33);
const SnapshotValuesItem_1 = __webpack_require__(34);
const SnapshotDashboardItem_1 = __webpack_require__(37);
class SnapshotItem extends vscode_1.TreeItem {
    parent;
    email;
    static contextValue = 'snapshotItem';
    static regExp = new RegExp(SnapshotItem.contextValue);
    id;
    snapshot;
    snapshotValues;
    constructor(parent, email, snapshot) {
        super(snapshot.snap_date);
        this.parent = parent;
        this.email = email;
        this.id = `/snapshots/${snapshot.snap_id}`;
        this.snapshot = snapshot;
    }
    async getTreeItem() {
        const { snapshot, snapshot_values } = await SnapshotItem.getSnapshot(this.email, this.snapshot.snap_id);
        this.snapshot = snapshot ?? this.snapshot;
        this.snapshotValues = snapshot_values ?? this.snapshotValues;
        return {
            id: this.id,
            label: this.snapshot.snap_date,
            description: `$${this.snapshot.total.toFixed(2)}`,
            contextValue: this.getContextValue(),
            collapsibleState: vscode_1.TreeItemCollapsibleState.Collapsed,
            iconPath: new vscode_1.ThemeIcon("device-camera", "white"),
        };
    }
    getChildren() {
        return [
            new SnapshotDashboardItem_1.SnapshotDashboardItem(this, this.email, this.snapshot, this.snapshotValues),
            new SnapshotDataItem_1.SnapshotDataItem(this, this.email, this.snapshot),
            new SnapshotValuesItem_1.SnapshotValuesItem(this, this.email, this.snapshot, this.snapshotValues),
        ];
    }
    viewProperties() {
        return JSON.stringify(this.snapshot, undefined, 4);
    }
    getContextValue() {
        return (0, contextUtils_1.createContextValue)([SnapshotItem.contextValue, constants_1.viewPropertiesContext]);
    }
    static async getSnapshot(email, snapshotId) {
        const response = await (0, getSnapshot_1.getSnapshot)((0, nonNull_1.nonNullValue)(await (0, tokenUtils_1.getAuthToken)(email)), snapshotId);
        // Explicitly build the object out so that it can be easily destructured as needed
        return {
            snapshot: response.data?.snapshot,
            snapshot_values: response.data?.snapshot_values,
            accounts: response.data?.accounts,
            holdings: response.data?.holdings,
        };
    }
}
exports.SnapshotItem = SnapshotItem;


/***/ }),
/* 31 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotDataItem = exports.snapshotWeightedErKey = exports.snapshotTotalKey = exports.snapshotRebalanceThresholdKey = exports.snapshotBenchmarkKey = exports.snapshotDescriptionKey = exports.snapshotDateKey = void 0;
const vscode_1 = __webpack_require__(1);
const contextUtils_1 = __webpack_require__(14);
const constants_1 = __webpack_require__(7);
const SnapshotDataKeyItem_1 = __webpack_require__(32);
const BenchmarksItem_1 = __webpack_require__(24);
exports.snapshotDateKey = 'snap_date';
exports.snapshotDescriptionKey = 'description';
exports.snapshotBenchmarkKey = 'benchmark';
exports.snapshotRebalanceThresholdKey = 'rebalance_threshold_pct';
exports.snapshotTotalKey = 'total';
exports.snapshotWeightedErKey = 'weighted_er_pct';
class SnapshotDataItem extends vscode_1.TreeItem {
    parent;
    email;
    snapshotData;
    static contextValue = 'snapshotDataItem';
    static regExp = new RegExp(SnapshotDataItem.contextValue);
    id;
    constructor(parent, email, snapshotData) {
        super('Data');
        this.parent = parent;
        this.email = email;
        this.snapshotData = snapshotData;
        this.id = `/users/${email}/snapshots/${snapshotData.snap_id}/snapshotData`;
    }
    getTreeItem() {
        return {
            id: this.id,
            label: this.label,
            contextValue: this.getContextValues(),
            collapsibleState: vscode_1.TreeItemCollapsibleState.Collapsed,
            iconPath: new vscode_1.ThemeIcon("json", "white"),
        };
    }
    async getChildren() {
        const benchmarks = await BenchmarksItem_1.BenchmarksItem.getBenchmarksWithCache(this.email);
        return [
            new SnapshotDataKeyItem_1.SnapshotDataKeyItem(this.parent, this.email, exports.snapshotDateKey, this.snapshotData.snap_date),
            new SnapshotDataKeyItem_1.SnapshotDataKeyItem(this.parent, this.email, exports.snapshotDescriptionKey, this.snapshotData.description || '""'),
            new SnapshotDataKeyItem_1.SnapshotDataKeyItem(this.parent, this.email, exports.snapshotBenchmarkKey, benchmarks.find(b => b.benchmark_id === this.snapshotData.benchmark_id)?.name ?? '""'),
            new SnapshotDataKeyItem_1.SnapshotDataKeyItem(this.parent, this.email, exports.snapshotRebalanceThresholdKey, String(this.snapshotData.rebalance_threshold_pct ?? 0)),
            new SnapshotDataKeyItem_1.SnapshotDataKeyItem(this.parent, this.email, exports.snapshotTotalKey, String(this.snapshotData.total.toFixed(2)), false),
            new SnapshotDataKeyItem_1.SnapshotDataKeyItem(this.parent, this.email, exports.snapshotWeightedErKey, String(this.snapshotData.weighted_er_pct.toFixed(3)), false),
        ];
    }
    getContextValues() {
        return (0, contextUtils_1.createContextValue)([SnapshotDataItem.contextValue, constants_1.viewPropertiesContext]);
    }
    viewProperties() {
        return JSON.stringify(this.snapshotData, undefined, 4);
    }
}
exports.SnapshotDataItem = SnapshotDataItem;


/***/ }),
/* 32 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotDataKeyItem = void 0;
const vscode_1 = __webpack_require__(1);
const contextUtils_1 = __webpack_require__(14);
const updateableTrue = 'updateable:true';
const updateableFalse = 'updateable:false';
class SnapshotDataKeyItem extends vscode_1.TreeItem {
    parent;
    email;
    key;
    value;
    updateable;
    static contextValue = 'snapshotDataKeyItem';
    static regExp = new RegExp(SnapshotDataKeyItem.contextValue);
    id;
    contextValuesToAdd;
    constructor(parent, email, key, value, updateable = true) {
        super(value);
        this.parent = parent;
        this.email = email;
        this.key = key;
        this.value = value;
        this.updateable = updateable;
        this.id = `/snapshots/${parent.snapshot.snap_id}/snapshotData/${key}`;
        this.description = key;
        this.contextValuesToAdd = [
            SnapshotDataKeyItem.contextValue,
            updateable ? updateableTrue : updateableFalse,
        ];
    }
    getTreeItem() {
        return {
            id: this.id,
            label: this.label,
            description: this.description,
            contextValue: this.getContextValues(),
            collapsibleState: vscode_1.TreeItemCollapsibleState.None,
            iconPath: new vscode_1.ThemeIcon("dash", "white"),
        };
    }
    getContextValues() {
        return (0, contextUtils_1.createContextValue)(this.contextValuesToAdd);
    }
}
exports.SnapshotDataKeyItem = SnapshotDataKeyItem;


/***/ }),
/* 33 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSnapshot = getSnapshot;
exports.getSnapshotLatest = getSnapshotLatest;
const constants_1 = __webpack_require__(7);
const settingUtils_1 = __webpack_require__(11);
const getSnapshots_1 = __webpack_require__(29);
async function getSnapshot(token, snapshotId) {
    const response = await fetch(`${settingUtils_1.settingUtils.getApiEndpointBaseUrl()}/api/${constants_1.latestApiVersion}/snapshots/${snapshotId}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return await response.json();
}
async function getSnapshotLatest(token) {
    const snapshotsResponse = await (0, getSnapshots_1.getSnapshotsLatest)(token);
    if (snapshotsResponse.error) {
        return {
            status: snapshotsResponse.status,
            data: undefined,
            error: snapshotsResponse.error,
        };
    }
    return await getSnapshot(token, snapshotsResponse.data?.snapshots?.[0].snap_id ?? 0);
}


/***/ }),
/* 34 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotValuesItem = void 0;
const vscode_1 = __webpack_require__(1);
const contextUtils_1 = __webpack_require__(14);
const constants_1 = __webpack_require__(7);
const AccountsItem_1 = __webpack_require__(9);
const HoldingsItem_1 = __webpack_require__(20);
const SnapshotValueItem_1 = __webpack_require__(35);
const nonNull_1 = __webpack_require__(12);
const reorder_1 = __webpack_require__(17);
const extensionVariables_1 = __webpack_require__(2);
const updateSnapshotValueOrder_1 = __webpack_require__(36);
const getSnapshot_1 = __webpack_require__(33);
const tokenUtils_1 = __webpack_require__(6);
class SnapshotValuesItem extends vscode_1.TreeItem {
    parent;
    email;
    snapshot;
    snapshotValues;
    static contextValue = 'snapshotValuesItem';
    static regExp = new RegExp(SnapshotValuesItem.contextValue);
    id;
    kind = 'snapshotValues';
    constructor(parent, email, snapshot, snapshotValues) {
        super(vscode_1.l10n.t('Values'));
        this.parent = parent;
        this.email = email;
        this.snapshot = snapshot;
        this.snapshotValues = snapshotValues;
        this.id = `/snapshots/${snapshot.snap_id}/snapshotValues`;
        this.contextValue = (0, contextUtils_1.createContextValue)([SnapshotValuesItem.contextValue, constants_1.reordererContext, constants_1.viewPropertiesContext]);
    }
    getTreeItem() {
        return {
            id: this.id,
            label: this.label,
            contextValue: this.contextValue,
            collapsibleState: vscode_1.TreeItemCollapsibleState.Collapsed,
            iconPath: new vscode_1.ThemeIcon("array", "white"),
        };
    }
    async getChildren() {
        const accounts = await AccountsItem_1.AccountsItem.getAccountsWithCache(this.email);
        const accountsMap = new Map();
        for (const account of accounts) {
            accountsMap.set(account.account_id, account);
        }
        const holdings = await HoldingsItem_1.HoldingsItem.getHoldingsWithCache(this.email);
        const holdingsMap = new Map();
        for (const holding of holdings) {
            holdingsMap.set(holding.holding_id, holding);
        }
        // Get ordered snapshotValues from server-side value_order
        const orderedSnapshotValues = this.getOrderedSnapshotValues();
        return orderedSnapshotValues.map(sv => new SnapshotValueItem_1.SnapshotValueItem(this.parent, this, this.email, (0, nonNull_1.nonNullValue)(accountsMap.get(sv.account_id)), (0, nonNull_1.nonNullValue)(holdingsMap.get(sv.holding_id)), this.snapshot, sv));
    }
    canReorderItem(item) {
        return !!item.contextValue?.includes(SnapshotValueItem_1.SnapshotValueItem.contextValue);
    }
    /**
     * Gets snapshot values ordered by server-side value_order.
     *
     * Uses GenericPiResourceModel abstraction because different resources have different ID fields:
     * - SnapshotValue uses 'snap_val_id'
     * - Account uses 'account_id'
     * - Holding uses 'holding_id'
     *
     * By converting to a common { id: string } format, we can use the same orderResourcesByTargetIds()
     * function for all resource types instead of writing separate ordering logic for each.
     */
    getOrderedSnapshotValues() {
        // Convert all snapshot values to GenericPiResourceModel (adds common 'id' field)
        const snapshotValueResourceModels = this.snapshotValues.map(sv => (0, reorder_1.convertToGenericPiResourceModel)(sv, 'snap_val_id'));
        // If server has value_order set, use it to order the resources
        if (this.snapshot.value_order && this.snapshot.value_order.length > 0) {
            const orderedResourceIds = this.snapshot.value_order.map(id => String(id));
            return (0, reorder_1.orderResourcesByTargetIds)(snapshotValueResourceModels, orderedResourceIds);
        }
        // Fallback: return snapshot values in their default order
        return this.snapshotValues;
    }
    /**
     * Required by Reorderer interface. Returns ordered snapshot values with GenericPiResourceModel structure.
     * The drag-drop controller uses this to understand the current order before computing the new order.
     */
    async getOrderedResourceModels() {
        return this.getOrderedSnapshotValues().map(sv => (0, reorder_1.convertToGenericPiResourceModel)(sv, 'snap_val_id'));
    }
    /**
     * Updates the snapshot value order on the server and refreshes the tree view.
     * Replaces client-side globalState caching with server-side persistence.
     */
    async reorderChildrenByTargetResourceModelIds(ids) {
        const token = await (0, tokenUtils_1.getAuthToken)(this.email);
        if (!token) {
            throw new Error('No authentication token available');
        }
        // Convert string IDs back to numbers for the API
        const valueOrder = ids.map(id => parseInt(id, 10));
        // Update order on server
        await (0, updateSnapshotValueOrder_1.updateSnapshotValueOrder)(token, this.snapshot.snap_id, { value_order: valueOrder });
        // Refetch snapshot to get updated value_order from server
        const updatedSnapshotResponse = await (0, getSnapshot_1.getSnapshot)(token, this.snapshot.snap_id);
        if (updatedSnapshotResponse.data?.snapshot) {
            // Update the local snapshot reference with server data
            Object.assign(this.snapshot, updatedSnapshotResponse.data.snapshot);
        }
        // Refresh tree view to display new order
        extensionVariables_1.ext.portfolioInstrumentsTdp.refresh(this);
    }
    viewProperties() {
        // Show values in the same order as displayed in the tree view
        const orderedSnapshotValues = this.getOrderedSnapshotValues();
        return JSON.stringify(orderedSnapshotValues, undefined, 4);
    }
}
exports.SnapshotValuesItem = SnapshotValuesItem;


/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotValueItem = void 0;
const vscode_1 = __webpack_require__(1);
const contextUtils_1 = __webpack_require__(14);
const constants_1 = __webpack_require__(7);
const textUtils_1 = __webpack_require__(15);
class SnapshotValueItem extends vscode_1.TreeItem {
    grandParent;
    parent;
    email;
    account;
    holding;
    snapshot;
    snapshotValue;
    static contextValue = 'snapshotValueItem';
    static regExp = new RegExp(SnapshotValueItem.contextValue);
    id;
    kind = 'snapshotValue';
    constructor(grandParent, parent, email, account, holding, snapshot, snapshotValue) {
        super(String(snapshotValue.snap_val_id));
        this.grandParent = grandParent;
        this.parent = parent;
        this.email = email;
        this.account = account;
        this.holding = holding;
        this.snapshot = snapshot;
        this.snapshotValue = snapshotValue;
        this.id = `/snapshots/${snapshot.snap_id}/snapshotValue/${snapshotValue.snap_val_id}`;
        this.contextValue = (0, contextUtils_1.createContextValue)([SnapshotValueItem.contextValue, constants_1.reorderableContext, constants_1.viewPropertiesContext]);
    }
    getTreeItem() {
        return {
            id: this.id,
            label: `${this.holding.name} (${this.holding.asset_category})`,
            description: `${this.account.name} ${this.account.institution}:${(0, textUtils_1.capitalize)(this.account.tax_shelter)} $${this.snapshotValue.total.toFixed(2)} `,
            contextValue: this.contextValue,
            collapsibleState: vscode_1.TreeItemCollapsibleState.None,
            iconPath: new vscode_1.ThemeIcon("variable", "white"),
        };
    }
    viewProperties() {
        return JSON.stringify(this.snapshotValue, undefined, 4);
    }
    getResourceId() {
        return this.snapshotValue.snap_val_id.toString();
    }
}
exports.SnapshotValueItem = SnapshotValueItem;


/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateSnapshotValueOrder = updateSnapshotValueOrder;
const constants_1 = __webpack_require__(7);
const settingUtils_1 = __webpack_require__(11);
async function updateSnapshotValueOrder(token, snapshotId, payload) {
    const response = await fetch(`${settingUtils_1.settingUtils.getApiEndpointBaseUrl()}/api/${constants_1.latestApiVersion}/snapshots/${snapshotId}/order`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });
    return await response.json();
}


/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotDashboardItem = void 0;
const vscode_1 = __webpack_require__(1);
const SnapshotRebalanceItem_1 = __webpack_require__(38);
const SnapshotByInstitutionsItem_1 = __webpack_require__(41);
const SnapshotByTaxShelterItem_1 = __webpack_require__(43);
const SnapshotByAssetCategoryItem_1 = __webpack_require__(45);
const SnapshotByMaturationDateItem_1 = __webpack_require__(47);
const SnapshotByLiquidityItem_1 = __webpack_require__(55);
class SnapshotDashboardItem extends vscode_1.TreeItem {
    parent;
    email;
    snapshotData;
    snapshotValues;
    static contextValue = 'snapshotDashboardItem';
    static regExp = new RegExp(SnapshotDashboardItem.contextValue);
    id;
    constructor(parent, email, snapshotData, snapshotValues) {
        super('Dashboard');
        this.parent = parent;
        this.email = email;
        this.snapshotData = snapshotData;
        this.snapshotValues = snapshotValues;
        this.id = `/snapshots/${snapshotData.snap_id}/dashboard`;
    }
    getTreeItem() {
        return {
            id: this.id,
            label: this.label,
            contextValue: SnapshotDashboardItem.contextValue,
            collapsibleState: vscode_1.TreeItemCollapsibleState.Collapsed,
            iconPath: new vscode_1.ThemeIcon("dashboard", "white"),
        };
    }
    getChildren() {
        return [
            new SnapshotByInstitutionsItem_1.SnapshotByInstitutionsItem(this.parent, this.email, this.snapshotData, this.snapshotValues),
            new SnapshotByTaxShelterItem_1.SnapshotByTaxShelterItem(this.parent, this.email, this.snapshotData, this.snapshotValues),
            new SnapshotByMaturationDateItem_1.SnapshotByMaturationDateItem(this.parent, this.email, this.snapshotData, this.snapshotValues),
            new SnapshotByLiquidityItem_1.SnapshotByLiquidityItem(this.parent, this.email, this.snapshotData, this.snapshotValues),
            new SnapshotByAssetCategoryItem_1.SnapshotByAssetCategoryItem(this.parent, this.email, this.snapshotData, this.snapshotValues),
            new SnapshotRebalanceItem_1.SnapshotRebalanceItem(this.parent, this.email, this.snapshotData),
        ];
    }
}
exports.SnapshotDashboardItem = SnapshotDashboardItem;


/***/ }),
/* 38 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotRebalanceItem = void 0;
const vscode_1 = __webpack_require__(1);
const getSnapshotRebalance_1 = __webpack_require__(39);
const tokenUtils_1 = __webpack_require__(6);
const nonNull_1 = __webpack_require__(12);
const contextUtils_1 = __webpack_require__(14);
const constants_1 = __webpack_require__(7);
const GenericItem_1 = __webpack_require__(19);
const crypto = __importStar(__webpack_require__(40));
class SnapshotRebalanceItem extends vscode_1.TreeItem {
    parent;
    email;
    snapshotData;
    static contextValue = 'snapshotRebalanceItem';
    static regExp = new RegExp(SnapshotRebalanceItem.contextValue);
    id;
    constructor(parent, email, snapshotData) {
        super('Rebalance Calculations');
        this.parent = parent;
        this.email = email;
        this.snapshotData = snapshotData;
        this.id = `/snapshots/${snapshotData.snap_id}/dashboard/rebalance`;
    }
    getContextValue() {
        return (0, contextUtils_1.createContextValue)([SnapshotRebalanceItem.contextValue, constants_1.viewPropertiesContext]);
    }
    getTreeItem() {
        return {
            id: this.id,
            label: this.label,
            contextValue: this.getContextValue(),
            collapsibleState: vscode_1.TreeItemCollapsibleState.Collapsed,
            iconPath: new vscode_1.ThemeIcon("diff-multiple", "white"),
        };
    }
    async getChildren() {
        const response = await (0, getSnapshotRebalance_1.getSnapshotRebalance)((0, nonNull_1.nonNullValue)(await (0, tokenUtils_1.getAuthToken)(this.email)), this.snapshotData.snap_id);
        if (response.error) {
            if (/must include a target benchmark/i.test(response.error)) {
                return [
                    new GenericItem_1.GenericItem({
                        id: crypto.randomUUID(),
                        label: vscode_1.l10n.t('Add a snapshot benchmark to get rebalance suggestions.'),
                        contextValue: 'addSnapshotBenchmarkItem',
                        iconPath: new vscode_1.ThemeIcon('info', 'white'),
                    }),
                ];
            }
            return [];
        }
        const rebalanceItems = response.data?.change_required?.map(alloc => {
            const changeRequired = alloc.value > 0 ? `+${alloc.value.toFixed(2)}` : `${alloc.value.toFixed(2)}`;
            return new GenericItem_1.GenericItem({
                id: `${this.id}/${alloc.category}`,
                label: alloc.category,
                description: changeRequired,
                contextValue: 'snapshotRebalanceItem',
                collapsibleState: vscode_1.TreeItemCollapsibleState.None,
                iconPath: new vscode_1.ThemeIcon('request-changes', 'white'),
            });
        }) ?? [];
        return [
            ...rebalanceItems,
            new GenericItem_1.GenericItem({
                id: `${this.id}/total`,
                label: `$${String(response.data?.snapshot_total_omit_skips.toFixed(2))}`,
                description: vscode_1.l10n.t('Total'),
                contextValue: 'rebalanceTotalItem',
                collapsibleState: vscode_1.TreeItemCollapsibleState.None,
                iconPath: new vscode_1.ThemeIcon('diff-multiple', 'white'),
            }),
            new GenericItem_1.GenericItem({
                id: `${this.id}/currentThreshold`,
                label: `${String(response.data?.rebalance_deviation_pct)}%`,
                description: vscode_1.l10n.t('Max Deviation') +
                    ((response.data?.rebalance_deviation_pct ?? 0) >= (this.snapshotData?.rebalance_threshold_pct ?? 100) ?
                        ' ' + vscode_1.l10n.t('(exceeds rebalance threshold)') :
                        ''),
                contextValue: 'currentThresholdItem',
                collapsibleState: vscode_1.TreeItemCollapsibleState.None,
                iconPath: (response.data?.rebalance_deviation_pct ?? 0) >= (this.snapshotData?.rebalance_threshold_pct ?? 100) ?
                    new vscode_1.ThemeIcon('warning', 'white') :
                    new vscode_1.ThemeIcon('pass', 'white')
            }),
        ];
    }
    async viewProperties() {
        const response = await (0, getSnapshotRebalance_1.getSnapshotRebalance)((0, nonNull_1.nonNullValue)(await (0, tokenUtils_1.getAuthToken)(this.email)), this.snapshotData.snap_id);
        return JSON.stringify(response.data ?? {}, undefined, 4);
    }
}
exports.SnapshotRebalanceItem = SnapshotRebalanceItem;


/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSnapshotRebalance = getSnapshotRebalance;
const constants_1 = __webpack_require__(7);
const settingUtils_1 = __webpack_require__(11);
async function getSnapshotRebalance(token, snapshotId) {
    const response = await fetch(`${settingUtils_1.settingUtils.getApiEndpointBaseUrl()}/api/${constants_1.latestApiVersion}/snapshots/${snapshotId}/rebalance`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return await response.json();
}


/***/ }),
/* 40 */
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotByInstitutionsItem = void 0;
const vscode_1 = __webpack_require__(1);
const tokenUtils_1 = __webpack_require__(6);
const nonNull_1 = __webpack_require__(12);
const contextUtils_1 = __webpack_require__(14);
const constants_1 = __webpack_require__(7);
const getSnapshotByAccount_1 = __webpack_require__(42);
const GenericItem_1 = __webpack_require__(19);
class SnapshotByInstitutionsItem extends vscode_1.TreeItem {
    parent;
    email;
    snapshotData;
    snapshotValues;
    static contextValue = 'snapshotByInstitutionsItem';
    static regExp = new RegExp(SnapshotByInstitutionsItem.contextValue);
    id;
    constructor(parent, email, snapshotData, snapshotValues) {
        super('Account Breakdown');
        this.parent = parent;
        this.email = email;
        this.snapshotData = snapshotData;
        this.snapshotValues = snapshotValues;
        this.id = `/snapshots/${snapshotData.snap_id}/dashboard/accountBreakdown`;
    }
    getContextValue() {
        return (0, contextUtils_1.createContextValue)([SnapshotByInstitutionsItem.contextValue, constants_1.viewPropertiesContext]);
    }
    getTreeItem() {
        return {
            id: this.id,
            label: this.label,
            contextValue: this.getContextValue(),
            collapsibleState: vscode_1.TreeItemCollapsibleState.Collapsed,
            iconPath: new vscode_1.ThemeIcon("graph-scatter", "white"),
        };
    }
    async getChildren() {
        const { fields: accountInstitutions, total: totals } = (0, nonNull_1.nonNullValue)(await SnapshotByInstitutionsItem.getSnapshotByAccount(this.email, this.snapshotData.snap_id));
        return accountInstitutions.map((acc, i) => {
            const percent = Math.round(totals[i] / this.snapshotData.total * 100);
            return new GenericItem_1.GenericItem({
                id: `${this.id}/${i}`,
                label: acc,
                description: `${totals[i].toFixed(2)} (${percent}%)`,
                contextValue: 'snapshotAccountItem',
                iconPath: new vscode_1.ThemeIcon('home', 'white'),
            });
        });
    }
    static async getSnapshotByAccount(email, snapId) {
        const response = await (0, getSnapshotByAccount_1.getSnapshotByAccount)((0, nonNull_1.nonNullValue)(await (0, tokenUtils_1.getAuthToken)(email)), snapId);
        return response.data?.accounts_grouped;
    }
    async viewProperties() {
        const response = await SnapshotByInstitutionsItem.getSnapshotByAccount(this.email, this.snapshotData.snap_id);
        return JSON.stringify(response ?? {}, undefined, 4);
    }
}
exports.SnapshotByInstitutionsItem = SnapshotByInstitutionsItem;


/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSnapshotByAccount = getSnapshotByAccount;
const constants_1 = __webpack_require__(7);
const settingUtils_1 = __webpack_require__(11);
async function getSnapshotByAccount(token, snapshotId) {
    const response = await fetch(`${settingUtils_1.settingUtils.getApiEndpointBaseUrl()}/api/${constants_1.latestApiVersion}/snapshots/${snapshotId}?group_by=ACCOUNT_INSTITUTION`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return await response.json();
}


/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotByTaxShelterItem = void 0;
const vscode_1 = __webpack_require__(1);
const tokenUtils_1 = __webpack_require__(6);
const nonNull_1 = __webpack_require__(12);
const contextUtils_1 = __webpack_require__(14);
const constants_1 = __webpack_require__(7);
const GenericItem_1 = __webpack_require__(19);
const getSnapshotByTaxShelter_1 = __webpack_require__(44);
class SnapshotByTaxShelterItem extends vscode_1.TreeItem {
    parent;
    email;
    snapshotData;
    snapshotValues;
    static contextValue = 'snapshotByTaxShelterItem';
    static regExp = new RegExp(SnapshotByTaxShelterItem.contextValue);
    id;
    constructor(parent, email, snapshotData, snapshotValues) {
        super('Tax Shelter Breakdown');
        this.parent = parent;
        this.email = email;
        this.snapshotData = snapshotData;
        this.snapshotValues = snapshotValues;
        this.id = `/snapshots/${snapshotData.snap_id}/dashboard/taxShelterBreakdown`;
    }
    getContextValue() {
        return (0, contextUtils_1.createContextValue)([SnapshotByTaxShelterItem.contextValue, constants_1.viewPropertiesContext]);
    }
    getTreeItem() {
        return {
            id: this.id,
            label: this.label,
            contextValue: this.getContextValue(),
            collapsibleState: vscode_1.TreeItemCollapsibleState.Collapsed,
            iconPath: new vscode_1.ThemeIcon("graph", "white"),
        };
    }
    async getChildren() {
        const { fields: taxShelters, total: totals } = (0, nonNull_1.nonNullValue)(await SnapshotByTaxShelterItem.getSnapshotByTaxShelter(this.email, this.snapshotData.snap_id));
        return taxShelters.map((shelter, i) => {
            const percent = Math.round(totals[i] / this.snapshotData.total * 100);
            return new GenericItem_1.GenericItem({
                id: `${this.id}/${i}`,
                label: shelter,
                description: `${totals[i].toFixed(2)} (${percent}%)`,
                contextValue: 'snapshotTaxShelterItem',
                iconPath: new vscode_1.ThemeIcon('folder', 'white'),
            });
        });
    }
    static async getSnapshotByTaxShelter(email, snapId) {
        const response = await (0, getSnapshotByTaxShelter_1.getSnapshotByTaxShelter)((0, nonNull_1.nonNullValue)(await (0, tokenUtils_1.getAuthToken)(email)), snapId);
        return response.data?.accounts_grouped;
    }
    async viewProperties() {
        const response = await SnapshotByTaxShelterItem.getSnapshotByTaxShelter(this.email, this.snapshotData.snap_id);
        return JSON.stringify(response ?? {}, undefined, 4);
    }
}
exports.SnapshotByTaxShelterItem = SnapshotByTaxShelterItem;


/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSnapshotByTaxShelter = getSnapshotByTaxShelter;
const constants_1 = __webpack_require__(7);
const settingUtils_1 = __webpack_require__(11);
async function getSnapshotByTaxShelter(token, snapshotId) {
    const response = await fetch(`${settingUtils_1.settingUtils.getApiEndpointBaseUrl()}/api/${constants_1.latestApiVersion}/snapshots/${snapshotId}?group_by=TAX_SHELTER`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return await response.json();
}


/***/ }),
/* 45 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotByAssetCategoryItem = void 0;
const vscode_1 = __webpack_require__(1);
const tokenUtils_1 = __webpack_require__(6);
const nonNull_1 = __webpack_require__(12);
const contextUtils_1 = __webpack_require__(14);
const constants_1 = __webpack_require__(7);
const GenericItem_1 = __webpack_require__(19);
const getSnapshotByAssetCategory_1 = __webpack_require__(46);
class SnapshotByAssetCategoryItem extends vscode_1.TreeItem {
    parent;
    email;
    snapshotData;
    snapshotValues;
    static contextValue = 'snapshotByAssetCategoryItem';
    static regExp = new RegExp(SnapshotByAssetCategoryItem.contextValue);
    id;
    constructor(parent, email, snapshotData, snapshotValues) {
        super('Asset Category Breakdown');
        this.parent = parent;
        this.email = email;
        this.snapshotData = snapshotData;
        this.snapshotValues = snapshotValues;
        this.id = `/snapshots/${snapshotData.snap_id}/dashboard/assetCategoryBreakdown`;
    }
    getContextValue() {
        return (0, contextUtils_1.createContextValue)([SnapshotByAssetCategoryItem.contextValue, constants_1.viewPropertiesContext]);
    }
    getTreeItem() {
        return {
            id: this.id,
            label: this.label,
            contextValue: this.getContextValue(),
            collapsibleState: vscode_1.TreeItemCollapsibleState.Collapsed,
            iconPath: new vscode_1.ThemeIcon("pie-chart", "white"),
        };
    }
    async getChildren() {
        const { fields: assetCategories, total: totals } = (0, nonNull_1.nonNullValue)(await SnapshotByAssetCategoryItem.getSnapshotByAssetCategory(this.email, this.snapshotData.snap_id));
        return assetCategories.map((category, i) => {
            const percent = Math.round(totals[i] / this.snapshotData.total * 100);
            return new GenericItem_1.GenericItem({
                id: `${this.id}/${i}`,
                label: category,
                description: `${totals[i].toFixed(2)} (${percent}%)`,
                contextValue: 'snapshotAssetCategoryItem',
                iconPath: new vscode_1.ThemeIcon('pie-chart', 'white'),
            });
        });
    }
    static async getSnapshotByAssetCategory(email, snapId) {
        const response = await (0, getSnapshotByAssetCategory_1.getSnapshotByAssetCategory)((0, nonNull_1.nonNullValue)(await (0, tokenUtils_1.getAuthToken)(email)), snapId);
        return response.data?.holdings_grouped;
    }
    async viewProperties() {
        const response = await SnapshotByAssetCategoryItem.getSnapshotByAssetCategory(this.email, this.snapshotData.snap_id);
        return JSON.stringify(response ?? {}, undefined, 4);
    }
}
exports.SnapshotByAssetCategoryItem = SnapshotByAssetCategoryItem;


/***/ }),
/* 46 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSnapshotByAssetCategory = getSnapshotByAssetCategory;
const constants_1 = __webpack_require__(7);
const settingUtils_1 = __webpack_require__(11);
async function getSnapshotByAssetCategory(token, snapshotId) {
    const response = await fetch(`${settingUtils_1.settingUtils.getApiEndpointBaseUrl()}/api/${constants_1.latestApiVersion}/snapshots/${snapshotId}?group_by=ASSET_CATEGORY`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return await response.json();
}


/***/ }),
/* 47 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotByMaturationDateItem = void 0;
const vscode_1 = __webpack_require__(1);
const tokenUtils_1 = __webpack_require__(6);
const nonNull_1 = __webpack_require__(12);
const contextUtils_1 = __webpack_require__(14);
const constants_1 = __webpack_require__(7);
const getSnapshotByMaturationDate_1 = __webpack_require__(48);
const SnapshotMaturationStartItem_1 = __webpack_require__(49);
const SnapshotMaturationEndItem_1 = __webpack_require__(50);
const MaturationDateItem_1 = __webpack_require__(51);
const SnapshotMaturationFilterItem_1 = __webpack_require__(54);
const GenericItem_1 = __webpack_require__(19);
class SnapshotByMaturationDateItem extends vscode_1.TreeItem {
    parent;
    email;
    snapshotData;
    snapshotValues;
    static contextValue = 'snapshotByMaturationDateItem';
    static regExp = new RegExp(SnapshotByMaturationDateItem.contextValue);
    id;
    constructor(parent, email, snapshotData, snapshotValues) {
        super('Maturation Date Breakdown');
        this.parent = parent;
        this.email = email;
        this.snapshotData = snapshotData;
        this.snapshotValues = snapshotValues;
        this.id = `/snapshots/${snapshotData.snap_id}/dashboard/maturationDateBreakdown`;
    }
    getContextValue() {
        return (0, contextUtils_1.createContextValue)([SnapshotByMaturationDateItem.contextValue, constants_1.viewPropertiesContext]);
    }
    getTreeItem() {
        return {
            id: this.id,
            label: this.label,
            contextValue: this.getContextValue(),
            collapsibleState: vscode_1.TreeItemCollapsibleState.Collapsed,
            iconPath: new vscode_1.ThemeIcon("graph-line", "white"),
        };
    }
    async getChildren() {
        const options = {
            startDate: SnapshotMaturationStartItem_1.SnapshotMaturationStartItem.getMaturationStart(this.email, this.snapshotData.snap_id),
            endDate: SnapshotMaturationEndItem_1.SnapshotMaturationEndItem.getMaturationEnd(this.email, this.snapshotData.snap_id),
        };
        const resources = await SnapshotByMaturationDateItem.getSnapshotByMaturationDate(this.email, this.snapshotData.snap_id, options) ?? [];
        const { durationYrs, interestRatePct } = this.computeWeightedAverageDurationAndInterestRate(resources);
        return [
            new SnapshotMaturationFilterItem_1.SnapshotMaturationFilterItem(this, this.email, this.snapshotData),
            ...resources
                .sort((a, b) => new Date(b.maturation_date).getTime() - new Date(a.maturation_date).getTime())
                .map((resource, idx) => new MaturationDateItem_1.MaturationDateItem(this, this.email, this.snapshotData, idx, resource)),
            new GenericItem_1.GenericItem({
                id: `${this.id}/averageRate`,
                label: interestRatePct + '%',
                description: 'Average Weighted Rate',
                contextValue: 'averageRateItem',
                collapsibleState: vscode_1.TreeItemCollapsibleState.None,
                iconPath: new vscode_1.ThemeIcon("graph-line", "white"),
            }),
            new GenericItem_1.GenericItem({
                id: `${this.id}/averageDuration`,
                label: durationYrs.toString() + ' Years',
                description: 'Average Weighted Duration',
                contextValue: 'averageDurationItem',
                collapsibleState: vscode_1.TreeItemCollapsibleState.None,
                iconPath: new vscode_1.ThemeIcon("graph-line", "white"),
            }),
        ];
    }
    computeWeightedAverageDurationAndInterestRate(resources) {
        const total = resources.reduce((sum, resource) => sum + resource.total, 0);
        const weightedDurationsYrs = [];
        const weightedInterestRatePcts = [];
        for (const r of resources) {
            const weight = r.total / total;
            const weightedInterestRatePct = weight * r.interest_rate_pct;
            weightedInterestRatePcts.push(weightedInterestRatePct);
            const durationYears = this.calculateDurationInYears(r.maturation_date);
            const weightedDuration = weight * durationYears;
            weightedDurationsYrs.push(weightedDuration);
        }
        const weightedDuration = weightedDurationsYrs.reduce((sum, wd) => sum + wd, 0);
        const weightedInterestRates = weightedInterestRatePcts.reduce((sum, wir) => sum + wir, 0);
        return {
            durationYrs: Math.round(weightedDuration * 100) / 100,
            interestRatePct: Math.round(weightedInterestRates * 100) / 100,
        };
    }
    calculateDurationInYears(maturationDate) {
        const currentDate = new Date();
        const matDate = new Date(maturationDate);
        const timeDifferenceMs = matDate.getTime() - currentDate.getTime();
        const durationYears = timeDifferenceMs / (1000 * 60 * 60 * 24 * 365.25); // 365.25 accounts for leap years
        return Math.max(0, durationYears); // Ensure non-negative duration
    }
    static async getSnapshotByMaturationDate(email, snapId, options) {
        const response = await (0, getSnapshotByMaturationDate_1.getSnapshotByMaturationDate)((0, nonNull_1.nonNullValue)(await (0, tokenUtils_1.getAuthToken)(email)), snapId, options);
        return response.data?.resources;
    }
    async viewProperties() {
        const options = {
            startDate: SnapshotMaturationStartItem_1.SnapshotMaturationStartItem.getMaturationStart(this.email, this.snapshotData.snap_id),
            endDate: SnapshotMaturationEndItem_1.SnapshotMaturationEndItem.getMaturationEnd(this.email, this.snapshotData.snap_id),
        };
        const response = await (0, getSnapshotByMaturationDate_1.getSnapshotByMaturationDate)((0, nonNull_1.nonNullValue)(await (0, tokenUtils_1.getAuthToken)(this.email)), this.snapshotData.snap_id, options);
        return JSON.stringify(response.data ?? {}, undefined, 4);
    }
}
exports.SnapshotByMaturationDateItem = SnapshotByMaturationDateItem;


/***/ }),
/* 48 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSnapshotByMaturationDate = getSnapshotByMaturationDate;
const constants_1 = __webpack_require__(7);
const settingUtils_1 = __webpack_require__(11);
async function getSnapshotByMaturationDate(token, snapshotId, options) {
    let url = `${settingUtils_1.settingUtils.getApiEndpointBaseUrl()}/api/${constants_1.latestApiVersion}/snapshots/${snapshotId}?group_by=MATURATION_DATE`;
    if (options?.startDate) {
        url += `&maturation_start=${options.startDate}`;
    }
    if (options?.endDate) {
        url += `&maturation_end=${options.endDate}`;
    }
    const response = await fetch(url, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return await response.json();
}


/***/ }),
/* 49 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotMaturationStartItem = void 0;
const vscode_1 = __webpack_require__(1);
const extensionVariables_1 = __webpack_require__(2);
class SnapshotMaturationStartItem extends vscode_1.TreeItem {
    parent;
    email;
    snapshotData;
    static contextValue = 'snapshotMaturationStartItem';
    static regExp = new RegExp(SnapshotMaturationStartItem.contextValue);
    id;
    constructor(parent, email, snapshotData, date) {
        super(date);
        this.parent = parent;
        this.email = email;
        this.snapshotData = snapshotData;
        this.id = `/snapshots/${snapshotData.snap_id}/dashboard/maturationStart`;
    }
    getTreeItem() {
        return {
            id: this.id,
            label: this.label,
            description: vscode_1.l10n.t('Start date'),
            contextValue: SnapshotMaturationStartItem.contextValue,
            collapsibleState: vscode_1.TreeItemCollapsibleState.None,
            iconPath: new vscode_1.ThemeIcon("settings", "white"),
        };
    }
    static generatePiExtMaturationStartId(email, snapId) {
        return `/users/${email}/snapshots/${snapId}/maturationStart`;
    }
    static getMaturationStart(email, snapId) {
        return extensionVariables_1.ext.context.globalState.get(SnapshotMaturationStartItem.generatePiExtMaturationStartId(email, snapId));
    }
    static setMaturationStart(email, snapId, maturationStart) {
        extensionVariables_1.ext.context.globalState.update(SnapshotMaturationStartItem.generatePiExtMaturationStartId(email, snapId), maturationStart);
    }
}
exports.SnapshotMaturationStartItem = SnapshotMaturationStartItem;


/***/ }),
/* 50 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotMaturationEndItem = void 0;
const vscode_1 = __webpack_require__(1);
const extensionVariables_1 = __webpack_require__(2);
class SnapshotMaturationEndItem extends vscode_1.TreeItem {
    parent;
    email;
    snapshotData;
    static contextValue = 'snapshotMaturationEndItem';
    static regExp = new RegExp(SnapshotMaturationEndItem.contextValue);
    id;
    constructor(parent, email, snapshotData, date) {
        super(date);
        this.parent = parent;
        this.email = email;
        this.snapshotData = snapshotData;
        this.id = `/snapshots/${snapshotData.snap_id}/dashboard/maturationEnd`;
    }
    getTreeItem() {
        return {
            id: this.id,
            label: this.label,
            description: vscode_1.l10n.t('End date'),
            contextValue: SnapshotMaturationEndItem.contextValue,
            collapsibleState: vscode_1.TreeItemCollapsibleState.None,
            iconPath: new vscode_1.ThemeIcon("settings", "white"),
        };
    }
    static generatePiExtMaturationEndId(email, snapId) {
        return `/users/${email}/snapshots/${snapId}/maturationEnd`;
    }
    static getMaturationEnd(email, snapId) {
        return extensionVariables_1.ext.context.globalState.get(SnapshotMaturationEndItem.generatePiExtMaturationEndId(email, snapId));
    }
    static setMaturationEnd(email, snapId, maturationEnd) {
        extensionVariables_1.ext.context.globalState.update(SnapshotMaturationEndItem.generatePiExtMaturationEndId(email, snapId), maturationEnd);
    }
}
exports.SnapshotMaturationEndItem = SnapshotMaturationEndItem;


/***/ }),
/* 51 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MaturationDateItem = void 0;
const vscode_1 = __webpack_require__(1);
const contextUtils_1 = __webpack_require__(14);
const constants_1 = __webpack_require__(7);
const dayjs_1 = __importDefault(__webpack_require__(52));
const relativeTime_1 = __importDefault(__webpack_require__(53));
dayjs_1.default.extend(relativeTime_1.default);
class MaturationDateItem extends vscode_1.TreeItem {
    parent;
    email;
    snapshotData;
    resourceIdx;
    resource;
    static contextValue = 'maturationDateItem';
    static regExp = new RegExp(MaturationDateItem.contextValue);
    id;
    constructor(parent, email, snapshotData, resourceIdx, resource) {
        super(resource.holding_name);
        this.parent = parent;
        this.email = email;
        this.snapshotData = snapshotData;
        this.resourceIdx = resourceIdx;
        this.resource = resource;
        this.id = `/snapshots/${snapshotData.snap_id}/dashboard/maturationDateBreakdown/${resourceIdx}`;
    }
    getTreeItem() {
        const maturationDate = new Date(this.resource.maturation_date);
        const timeFrom = (0, dayjs_1.default)(`${maturationDate.getFullYear()}-${maturationDate.getMonth() + 1}-${maturationDate.getDate()}`).fromNow();
        return {
            id: this.id,
            label: `${this.label}${this.resource.interest_rate_pct ? ` (${this.resource.interest_rate_pct.toFixed(2)}%)` : ''}`,
            description: `${this.resource.maturation_date} (expiration ${timeFrom})`,
            contextValue: this.getContextValue(),
            collapsibleState: vscode_1.TreeItemCollapsibleState.None,
            iconPath: new vscode_1.ThemeIcon("note", "white"),
        };
    }
    getContextValue() {
        return (0, contextUtils_1.createContextValue)([MaturationDateItem.contextValue, constants_1.viewPropertiesContext]);
    }
    viewProperties() {
        return JSON.stringify(this.resource, undefined, 4);
    }
}
exports.MaturationDateItem = MaturationDateItem;


/***/ }),
/* 52 */
/***/ (function(module) {

!function(t,e){ true?module.exports=e():0}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",c="month",f="quarter",h="year",d="date",l="Invalid Date",$=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(t){var e=["th","st","nd","rd"],n=t%100;return"["+t+(e[(n-20)%10]||e[n]||e[0])+"]"}},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},v={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,c),s=n-i<0,u=e.clone().add(r+(s?-1:1),c);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:c,y:h,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:f}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},g="en",D={};D[g]=M;var p="$isDayjsObject",S=function(t){return t instanceof _||!(!t||!t[p])},w=function t(e,n,r){var i;if(!e)return g;if("string"==typeof e){var s=e.toLowerCase();D[s]&&(i=s),n&&(D[s]=n,i=s);var u=e.split("-");if(!i&&u.length>1)return t(u[0])}else{var a=e.name;D[a]=e,i=a}return!r&&i&&(g=i),i||!r&&g},O=function(t,e){if(S(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},b=v;b.l=w,b.i=S,b.w=function(t,e){return O(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=w(t.locale,null,!0),this.parse(t),this.$x=this.$x||t.x||{},this[p]=!0}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(b.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match($);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return b},m.isValid=function(){return!(this.$d.toString()===l)},m.isSame=function(t,e){var n=O(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return O(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<O(t)},m.$g=function(t,e,n){return b.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!b.u(e)||e,f=b.p(t),l=function(t,e){var i=b.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},$=function(t,e){return b.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,v="set"+(this.$u?"UTC":"");switch(f){case h:return r?l(1,0):l(31,11);case c:return r?l(1,M):l(0,M+1);case o:var g=this.$locale().weekStart||0,D=(y<g?y+7:y)-g;return l(r?m-D:m+(6-D),M);case a:case d:return $(v+"Hours",0);case u:return $(v+"Minutes",1);case s:return $(v+"Seconds",2);case i:return $(v+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=b.p(t),f="set"+(this.$u?"UTC":""),l=(n={},n[a]=f+"Date",n[d]=f+"Date",n[c]=f+"Month",n[h]=f+"FullYear",n[u]=f+"Hours",n[s]=f+"Minutes",n[i]=f+"Seconds",n[r]=f+"Milliseconds",n)[o],$=o===a?this.$D+(e-this.$W):e;if(o===c||o===h){var y=this.clone().set(d,1);y.$d[l]($),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else l&&this.$d[l]($);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[b.p(t)]()},m.add=function(r,f){var d,l=this;r=Number(r);var $=b.p(f),y=function(t){var e=O(l);return b.w(e.date(e.date()+Math.round(t*r)),l)};if($===c)return this.set(c,this.$M+r);if($===h)return this.set(h,this.$y+r);if($===a)return y(1);if($===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[$]||1,m=this.$d.getTime()+r*M;return b.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||l;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=b.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,c=n.months,f=n.meridiem,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].slice(0,s)},d=function(t){return b.s(s%12||12,t,"0")},$=f||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r};return r.replace(y,(function(t,r){return r||function(t){switch(t){case"YY":return String(e.$y).slice(-2);case"YYYY":return b.s(e.$y,4,"0");case"M":return a+1;case"MM":return b.s(a+1,2,"0");case"MMM":return h(n.monthsShort,a,c,3);case"MMMM":return h(c,a);case"D":return e.$D;case"DD":return b.s(e.$D,2,"0");case"d":return String(e.$W);case"dd":return h(n.weekdaysMin,e.$W,o,2);case"ddd":return h(n.weekdaysShort,e.$W,o,3);case"dddd":return o[e.$W];case"H":return String(s);case"HH":return b.s(s,2,"0");case"h":return d(1);case"hh":return d(2);case"a":return $(s,u,!0);case"A":return $(s,u,!1);case"m":return String(u);case"mm":return b.s(u,2,"0");case"s":return String(e.$s);case"ss":return b.s(e.$s,2,"0");case"SSS":return b.s(e.$ms,3,"0");case"Z":return i}return null}(t)||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,l){var $,y=this,M=b.p(d),m=O(r),v=(m.utcOffset()-this.utcOffset())*e,g=this-m,D=function(){return b.m(y,m)};switch(M){case h:$=D()/12;break;case c:$=D();break;case f:$=D()/3;break;case o:$=(g-v)/6048e5;break;case a:$=(g-v)/864e5;break;case u:$=g/n;break;case s:$=g/e;break;case i:$=g/t;break;default:$=g}return l?$:b.a($)},m.daysInMonth=function(){return this.endOf(c).$D},m.$locale=function(){return D[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=w(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return b.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),k=_.prototype;return O.prototype=k,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",c],["$y",h],["$D",d]].forEach((function(t){k[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),O.extend=function(t,e){return t.$i||(t(e,_,O),t.$i=!0),O},O.locale=w,O.isDayjs=S,O.unix=function(t){return O(1e3*t)},O.en=D[g],O.Ls=D,O.p={},O}));

/***/ }),
/* 53 */
/***/ (function(module) {

!function(r,e){ true?module.exports=e():0}(this,(function(){"use strict";return function(r,e,t){r=r||{};var n=e.prototype,o={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function i(r,e,t,o){return n.fromToBase(r,e,t,o)}t.en.relativeTime=o,n.fromToBase=function(e,n,i,d,u){for(var f,a,s,l=i.$locale().relativeTime||o,h=r.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],m=h.length,c=0;c<m;c+=1){var y=h[c];y.d&&(f=d?t(e).diff(i,y.d,!0):i.diff(e,y.d,!0));var p=(r.rounding||Math.round)(Math.abs(f));if(s=f>0,p<=y.r||!y.r){p<=1&&c>0&&(y=h[c-1]);var v=l[y.l];u&&(p=u(""+p)),a="string"==typeof v?v.replace("%d",p):v(p,n,y.l,s);break}}if(n)return a;var M=s?l.future:l.past;return"function"==typeof M?M(a):M.replace("%s",a)},n.to=function(r,e){return i(r,e,this,!0)},n.from=function(r,e){return i(r,e,this)};var d=function(r){return r.$u?t.utc():t()};n.toNow=function(r){return this.to(d(this),r)},n.fromNow=function(r){return this.from(d(this),r)}}}));

/***/ }),
/* 54 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotMaturationFilterItem = void 0;
const vscode_1 = __webpack_require__(1);
const SnapshotMaturationStartItem_1 = __webpack_require__(49);
const SnapshotMaturationEndItem_1 = __webpack_require__(50);
class SnapshotMaturationFilterItem extends vscode_1.TreeItem {
    parent;
    email;
    snapshotData;
    static contextValue = 'snapshotMaturationFilterItem';
    static regExp = new RegExp(SnapshotMaturationFilterItem.contextValue);
    id;
    constructor(parent, email, snapshotData) {
        super('Filter');
        this.parent = parent;
        this.email = email;
        this.snapshotData = snapshotData;
        this.id = `/snapshots/${snapshotData.snap_id}/dashboard/maturationDateBreakdown/filter`;
    }
    getTreeItem() {
        return {
            id: this.id,
            label: this.label,
            contextValue: SnapshotMaturationFilterItem.contextValue,
            collapsibleState: vscode_1.TreeItemCollapsibleState.Collapsed,
            iconPath: new vscode_1.ThemeIcon("gear", "white"),
        };
    }
    async getChildren() {
        const options = {
            startDate: SnapshotMaturationStartItem_1.SnapshotMaturationStartItem.getMaturationStart(this.email, this.snapshotData.snap_id),
            endDate: SnapshotMaturationEndItem_1.SnapshotMaturationEndItem.getMaturationEnd(this.email, this.snapshotData.snap_id),
        };
        return [
            new SnapshotMaturationStartItem_1.SnapshotMaturationStartItem(this.parent, this.email, this.snapshotData, options.startDate ?? 'mm/dd/yyyy'),
            new SnapshotMaturationEndItem_1.SnapshotMaturationEndItem(this.parent, this.email, this.snapshotData, options.endDate ?? 'mm/dd/yyyy'),
        ];
    }
}
exports.SnapshotMaturationFilterItem = SnapshotMaturationFilterItem;


/***/ }),
/* 55 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotByLiquidityItem = void 0;
const vscode_1 = __webpack_require__(1);
const contextUtils_1 = __webpack_require__(14);
const constants_1 = __webpack_require__(7);
const getSnapshotByLiquidity_1 = __webpack_require__(56);
const nonNull_1 = __webpack_require__(12);
const tokenUtils_1 = __webpack_require__(6);
const LiquidityItem_1 = __webpack_require__(57);
const GenericItem_1 = __webpack_require__(19);
class SnapshotByLiquidityItem extends vscode_1.TreeItem {
    parent;
    email;
    snapshotData;
    snapshotValues;
    static contextValue = 'snapshotByLiquidityItem';
    static regExp = new RegExp(SnapshotByLiquidityItem.contextValue);
    id;
    constructor(parent, email, snapshotData, snapshotValues) {
        super('Liquidity Breakdown');
        this.parent = parent;
        this.email = email;
        this.snapshotData = snapshotData;
        this.snapshotValues = snapshotValues;
        this.id = `/snapshots/${snapshotData.snap_id}/dashboard/liquidityBreakdown`;
    }
    getContextValue() {
        return (0, contextUtils_1.createContextValue)([SnapshotByLiquidityItem.contextValue, constants_1.viewPropertiesContext]);
    }
    getTreeItem() {
        return {
            id: this.id,
            label: this.label,
            contextValue: this.getContextValue(),
            collapsibleState: vscode_1.TreeItemCollapsibleState.Collapsed,
            iconPath: new vscode_1.ThemeIcon("beaker", "white"),
        };
    }
    async getChildren() {
        const resources = await (0, getSnapshotByLiquidity_1.getSnapshotByLiquidity)((0, nonNull_1.nonNullValue)(await (0, tokenUtils_1.getAuthToken)(this.email)), this.snapshotData.snap_id);
        return [
            // Liquidity Items
            ...resources.data?.resources
                ?.filter(r => r.total > 0)
                ?.sort((a, b) => b.total - a.total)
                ?.map((r, idx) => new LiquidityItem_1.LiquidityItem(this.parent, this.email, this.snapshotData, idx, r)) ?? [],
            // Total
            new GenericItem_1.GenericItem({
                id: `${this.id}/liquidityTotal`,
                label: '$' + String(resources.data?.liquid_total ?? 0),
                description: 'Total',
                contextValue: 'liquidityTotalItem',
                iconPath: new vscode_1.ThemeIcon('beaker', 'white'),
            }),
        ];
    }
    static async getSnapshotByLiquidity(email, snapId) {
        const response = await (0, getSnapshotByLiquidity_1.getSnapshotByLiquidity)((0, nonNull_1.nonNullValue)(await (0, tokenUtils_1.getAuthToken)(email)), snapId);
        return response.data?.resources;
    }
    async viewProperties() {
        const response = await (0, getSnapshotByLiquidity_1.getSnapshotByLiquidity)((0, nonNull_1.nonNullValue)(await (0, tokenUtils_1.getAuthToken)(this.email)), this.snapshotData.snap_id);
        return JSON.stringify(response.data ?? {}, undefined, 4);
    }
}
exports.SnapshotByLiquidityItem = SnapshotByLiquidityItem;


/***/ }),
/* 56 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getSnapshotByLiquidity = getSnapshotByLiquidity;
const constants_1 = __webpack_require__(7);
const settingUtils_1 = __webpack_require__(11);
async function getSnapshotByLiquidity(token, snapshotId) {
    const response = await fetch(`${settingUtils_1.settingUtils.getApiEndpointBaseUrl()}/api/${constants_1.latestApiVersion}/snapshots/${snapshotId}?group_by=LIQUIDITY`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return await response.json();
}


/***/ }),
/* 57 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LiquidityItem = void 0;
const vscode_1 = __webpack_require__(1);
const constants_1 = __webpack_require__(7);
const contextUtils_1 = __webpack_require__(14);
const textUtils_1 = __webpack_require__(15);
class LiquidityItem extends vscode_1.TreeItem {
    parent;
    email;
    snapshotData;
    resourceIdx;
    resource;
    static contextValue = 'liquidityItem';
    static regExp = new RegExp(LiquidityItem.contextValue);
    id;
    constructor(parent, email, snapshotData, resourceIdx, resource) {
        super(resource.holding_name);
        this.parent = parent;
        this.email = email;
        this.snapshotData = snapshotData;
        this.resourceIdx = resourceIdx;
        this.resource = resource;
        this.id = `/snapshots/${snapshotData.snap_id}/dashboard/liquidityBreakdown/${resourceIdx}`;
    }
    getContextValue() {
        return (0, contextUtils_1.createContextValue)([LiquidityItem.contextValue, constants_1.viewPropertiesContext]);
    }
    getTreeItem() {
        return {
            id: this.id,
            label: this.label,
            description: `${this.resource.account_name} ${this.resource.institution}:${(0, textUtils_1.capitalize)(this.resource.tax_shelter)} $${this.resource.total.toFixed(2)} `,
            contextValue: this.getContextValue(),
            collapsibleState: vscode_1.TreeItemCollapsibleState.None,
            iconPath: new vscode_1.ThemeIcon("note", "white"),
        };
    }
    async viewProperties() {
        return JSON.stringify(this.resource ?? {}, undefined, 4);
    }
}
exports.LiquidityItem = LiquidityItem;


/***/ }),
/* 58 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotDraftItem = void 0;
const vscode_1 = __webpack_require__(1);
const contextUtils_1 = __webpack_require__(14);
const constants_1 = __webpack_require__(7);
const SnapshotDataDraftItem_1 = __webpack_require__(59);
const SnapshotValuesDraftItem_1 = __webpack_require__(61);
const extensionVariables_1 = __webpack_require__(2);
const SnapshotByAccountsDraftItem_1 = __webpack_require__(63);
class SnapshotDraftItem extends vscode_1.TreeItem {
    parent;
    email;
    snapshotData;
    snapshotValues;
    static contextValue = 'snapshotDraftItem';
    static regExp = new RegExp(SnapshotDraftItem.contextValue);
    id;
    constructor(parent, email, snapshotData, snapshotValues) {
        super(snapshotData.snap_date);
        this.parent = parent;
        this.email = email;
        this.snapshotData = snapshotData;
        this.snapshotValues = snapshotValues;
        this.id = `/users/${email}/snapshots/draft`;
    }
    getTreeItem() {
        const snapshotDraft = extensionVariables_1.ext.snapshotDraftFileSystem.parseSnapshotDraft(this.email);
        this.snapshotData = { ...snapshotDraft, snapshot_values: undefined };
        this.snapshotValues = snapshotDraft?.snapshot_values ?? [];
        const total = this.snapshotValues.reduce((cur, sv) => cur + sv.total, 0);
        return {
            id: this.id,
            label: vscode_1.l10n.t('Draft'),
            description: `$${total.toFixed(2)}`,
            contextValue: this.getContextValues(),
            collapsibleState: vscode_1.TreeItemCollapsibleState.Expanded,
            iconPath: new vscode_1.ThemeIcon("device-camera", "white"),
        };
    }
    getChildren() {
        return [
            new SnapshotByAccountsDraftItem_1.SnapshotByAccountsDraftItem(this, this.email, this.snapshotData, this.snapshotValues),
            new SnapshotDataDraftItem_1.SnapshotDataDraftItem(this, this.email, this.snapshotData),
            new SnapshotValuesDraftItem_1.SnapshotValuesDraftItem(this, this.email, this.snapshotValues),
        ];
    }
    getContextValues() {
        return (0, contextUtils_1.createContextValue)([SnapshotDraftItem.contextValue, constants_1.viewPropertiesContext]);
    }
    viewProperties() {
        return JSON.stringify({ ...this.snapshotData, snapshot_values: this.snapshotValues }, undefined, 4);
    }
}
exports.SnapshotDraftItem = SnapshotDraftItem;


/***/ }),
/* 59 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotDataDraftItem = void 0;
const vscode_1 = __webpack_require__(1);
const contextUtils_1 = __webpack_require__(14);
const constants_1 = __webpack_require__(7);
const SnapshotDataKeyDraftItem_1 = __webpack_require__(60);
const BenchmarksItem_1 = __webpack_require__(24);
const SnapshotDataItem_1 = __webpack_require__(31);
class SnapshotDataDraftItem extends vscode_1.TreeItem {
    parent;
    email;
    snapshotData;
    static contextValue = 'snapshotDataDraftItem';
    static regExp = new RegExp(SnapshotDataDraftItem.contextValue);
    id;
    constructor(parent, email, snapshotData) {
        super('Data');
        this.parent = parent;
        this.email = email;
        this.snapshotData = snapshotData;
        this.id = `/users/${email}/snapshots/draft/snapshotData`;
    }
    getTreeItem() {
        return {
            id: this.id,
            label: this.label,
            contextValue: this.getContextValues(),
            collapsibleState: vscode_1.TreeItemCollapsibleState.Expanded,
            iconPath: new vscode_1.ThemeIcon("json", "white"),
        };
    }
    async getChildren() {
        const benchmarks = await BenchmarksItem_1.BenchmarksItem.getBenchmarksWithCache(this.email);
        return [
            new SnapshotDataKeyDraftItem_1.SnapshotDataKeyDraftItem(this.parent, this.email, this.snapshotData, SnapshotDataItem_1.snapshotDateKey, this.snapshotData.snap_date),
            new SnapshotDataKeyDraftItem_1.SnapshotDataKeyDraftItem(this.parent, this.email, this.snapshotData, SnapshotDataItem_1.snapshotDescriptionKey, this.snapshotData.description || '""'),
            new SnapshotDataKeyDraftItem_1.SnapshotDataKeyDraftItem(this.parent, this.email, this.snapshotData, SnapshotDataItem_1.snapshotBenchmarkKey, benchmarks.find(b => b.benchmark_id === this.snapshotData.benchmark_id)?.name ?? '""'),
            new SnapshotDataKeyDraftItem_1.SnapshotDataKeyDraftItem(this.parent, this.email, this.snapshotData, SnapshotDataItem_1.snapshotRebalanceThresholdKey, this.snapshotData.rebalance_threshold_pct?.toString() ?? ''),
        ];
    }
    getContextValues() {
        return (0, contextUtils_1.createContextValue)([SnapshotDataDraftItem.contextValue, constants_1.viewPropertiesContext]);
    }
    viewProperties() {
        return JSON.stringify(this.snapshotData, undefined, 4);
    }
}
exports.SnapshotDataDraftItem = SnapshotDataDraftItem;


/***/ }),
/* 60 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotDataKeyDraftItem = void 0;
const vscode_1 = __webpack_require__(1);
class SnapshotDataKeyDraftItem extends vscode_1.TreeItem {
    parent;
    email;
    snapshotData;
    key;
    value;
    static contextValue = 'snapshotDataKeyDraftItem';
    static regExp = new RegExp(SnapshotDataKeyDraftItem.contextValue);
    id;
    constructor(parent, email, snapshotData, key, value) {
        super(value);
        this.parent = parent;
        this.email = email;
        this.snapshotData = snapshotData;
        this.key = key;
        this.value = value;
        this.id = `/users/${email}/snapshots/draft/snapshotData/${key}`;
        this.description = key;
    }
    getTreeItem() {
        return {
            id: this.id,
            label: this.label,
            description: this.description,
            contextValue: SnapshotDataKeyDraftItem.contextValue,
            collapsibleState: vscode_1.TreeItemCollapsibleState.None,
            iconPath: new vscode_1.ThemeIcon("dash", "white"),
        };
    }
}
exports.SnapshotDataKeyDraftItem = SnapshotDataKeyDraftItem;


/***/ }),
/* 61 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotValuesDraftItem = void 0;
const vscode_1 = __webpack_require__(1);
const contextUtils_1 = __webpack_require__(14);
const constants_1 = __webpack_require__(7);
const SnapshotValueDraftItem_1 = __webpack_require__(62);
const AccountsItem_1 = __webpack_require__(9);
const HoldingsItem_1 = __webpack_require__(20);
const nonNull_1 = __webpack_require__(12);
const reorder_1 = __webpack_require__(17);
const extensionVariables_1 = __webpack_require__(2);
class SnapshotValuesDraftItem extends vscode_1.TreeItem {
    parent;
    email;
    snapshotValues;
    static contextValue = 'snapshotValuesDraftItem';
    static regExp = new RegExp(SnapshotValuesDraftItem.contextValue);
    id;
    kind;
    constructor(parent, email, snapshotValues) {
        super('Values');
        this.parent = parent;
        this.email = email;
        this.snapshotValues = snapshotValues;
        this.id = `/users/${email}/snapshots/draft/snapshotValues`;
        this.contextValue = (0, contextUtils_1.createContextValue)([SnapshotValuesDraftItem.contextValue, constants_1.reordererContext, constants_1.viewPropertiesContext]);
    }
    getTreeItem() {
        return {
            id: this.id,
            label: this.label,
            contextValue: this.contextValue,
            collapsibleState: vscode_1.TreeItemCollapsibleState.Expanded,
            iconPath: new vscode_1.ThemeIcon("array", "white"),
        };
    }
    async getChildren() {
        const accounts = await AccountsItem_1.AccountsItem.getAccountsWithCache(this.email);
        const accountsMap = new Map();
        for (const account of accounts) {
            accountsMap.set(account.account_id, account);
        }
        const holdings = await HoldingsItem_1.HoldingsItem.getHoldingsWithCache(this.email);
        const holdingsMap = new Map();
        for (const holding of holdings) {
            holdingsMap.set(holding.holding_id, holding);
        }
        return this.snapshotValues.map((sv, i) => new SnapshotValueDraftItem_1.SnapshotValueDraftItem(this.parent, this, this.email, i, sv, (0, nonNull_1.nonNullValue)(accountsMap.get(sv.account_id)), (0, nonNull_1.nonNullValue)(holdingsMap.get(sv.holding_id))));
    }
    canReorderItem(item) {
        return !!item.contextValue?.includes(SnapshotValueDraftItem_1.SnapshotValueDraftItem.contextValue);
    }
    async getOrderedResourceModels() {
        // There are no resource model ids because draft items represent resources that haven't been created yet...
        // so just use the current index of the value as the ID
        // (Also, there's no need to manage any reordering here because we always reorder the source draft directly)
        return this.snapshotValues.map((sv, idx) => {
            return {
                ...sv,
                id: String(idx),
            };
        });
    }
    async reorderChildrenByTargetResourceModelIds(ids) {
        const snapshotValues = await this.getOrderedResourceModels();
        // Remove the generic resource id we added as it's not required by the actual API
        const reorderedValues = (0, reorder_1.orderResourcesByTargetIds)(snapshotValues, ids)
            .map(sv => {
            delete sv.id;
            return sv;
        });
        await extensionVariables_1.ext.snapshotDraftFileSystem.updateSnapshotValuesDraft(this.parent, reorderedValues);
        extensionVariables_1.ext.portfolioInstrumentsTdp.refresh(this.parent);
    }
    viewProperties() {
        return JSON.stringify(this.snapshotValues, undefined, 4);
    }
}
exports.SnapshotValuesDraftItem = SnapshotValuesDraftItem;


/***/ }),
/* 62 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotValueDraftItem = void 0;
const vscode_1 = __webpack_require__(1);
const contextUtils_1 = __webpack_require__(14);
const constants_1 = __webpack_require__(7);
const textUtils_1 = __webpack_require__(15);
class SnapshotValueDraftItem extends vscode_1.TreeItem {
    grandParent;
    parent;
    email;
    svIdx;
    snapshotValue;
    account;
    holding;
    static contextValue = 'snapshotValueDraftItem';
    static regExp = new RegExp(SnapshotValueDraftItem.contextValue);
    id;
    kind = 'snapshotValueDraft';
    constructor(grandParent, parent, email, svIdx, snapshotValue, account, holding) {
        super(holding.name);
        this.grandParent = grandParent;
        this.parent = parent;
        this.email = email;
        this.svIdx = svIdx;
        this.snapshotValue = snapshotValue;
        this.account = account;
        this.holding = holding;
        this.id = `/users/${email}/snapshots/draft/snapshotValues/${svIdx}`;
        this.contextValue = (0, contextUtils_1.createContextValue)([SnapshotValueDraftItem.contextValue, constants_1.reorderableContext, constants_1.viewPropertiesContext]);
    }
    getTreeItem() {
        return {
            id: this.id,
            label: `${this.holding.name} (${this.holding.asset_category})`,
            description: `${this.account.name} ${this.account.institution}:${(0, textUtils_1.capitalize)(this.account.tax_shelter)} $${this.snapshotValue.total.toFixed(2)} `,
            contextValue: this.contextValue,
            collapsibleState: vscode_1.TreeItemCollapsibleState.None,
            iconPath: new vscode_1.ThemeIcon("variable", "white"),
        };
    }
    viewProperties() {
        return JSON.stringify(this.snapshotValue, undefined, 4);
    }
    getResourceId() {
        // Since draft items don't have real resource IDs assigned yet, just use the index
        return String(this.svIdx);
    }
}
exports.SnapshotValueDraftItem = SnapshotValueDraftItem;


/***/ }),
/* 63 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotByAccountsDraftItem = void 0;
const vscode_1 = __webpack_require__(1);
const extensionVariables_1 = __webpack_require__(2);
const AccountsItem_1 = __webpack_require__(9);
const GenericItem_1 = __webpack_require__(19);
const nonNull_1 = __webpack_require__(12);
const textUtils_1 = __webpack_require__(15);
class SnapshotByAccountsDraftItem extends vscode_1.TreeItem {
    parent;
    email;
    snapshotData;
    snapshotValues;
    static contextValue = 'snapshotByAccountsDraftItem';
    static regExp = new RegExp(SnapshotByAccountsDraftItem.contextValue);
    id;
    constructor(parent, email, snapshotData, snapshotValues) {
        super('Account Breakdown');
        this.parent = parent;
        this.email = email;
        this.snapshotData = snapshotData;
        this.snapshotValues = snapshotValues;
        this.id = `/users/${this.email}/snapshots/draft/accountsBreakdown`;
    }
    getTreeItem() {
        return {
            id: this.id,
            label: this.label,
            contextValue: SnapshotByAccountsDraftItem.contextValue,
            collapsibleState: vscode_1.TreeItemCollapsibleState.Collapsed,
            iconPath: new vscode_1.ThemeIcon("graph-scatter", "white"),
        };
    }
    async getChildren() {
        const accounts = await AccountsItem_1.AccountsItem.getAccountsWithCache(this.email);
        const accountsMap = new Map();
        for (const account of accounts) {
            accountsMap.set(account.account_id, account);
        }
        const snapshotValues = extensionVariables_1.ext.snapshotDraftFileSystem.parseSnapshotDraft(this.email)?.snapshot_values ?? [];
        const accountBreakdown = {};
        for (const sv of snapshotValues) {
            const accountName = accountsMap.get(sv.account_id)?.name;
            if (!accountName) {
                continue;
            }
            let total = accountBreakdown[sv.account_id] ?? 0;
            total += sv.total;
            accountBreakdown[sv.account_id] = total;
        }
        const items = [];
        for (const [accountId, total] of Object.entries(accountBreakdown)) {
            const account = (0, nonNull_1.nonNullValue)(accountsMap.get(Number(accountId)));
            items.push(new GenericItem_1.GenericItem({
                id: `${this.id}/${account.name}`,
                label: account.name,
                description: `$${total.toFixed(2)} (${account.institution}:${(0, textUtils_1.capitalize)(account.tax_shelter)})`,
                contextValue: 'snapshotByInstitutionsDraftItem',
                iconPath: new vscode_1.ThemeIcon('home', 'white'),
            }));
        }
        return items;
    }
}
exports.SnapshotByAccountsDraftItem = SnapshotByAccountsDraftItem;


/***/ }),
/* 64 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiEndpointItem = void 0;
const vscode_1 = __webpack_require__(1);
const settingUtils_1 = __webpack_require__(11);
const setApiEndpoint = vscode_1.l10n.t('API endpoint');
class ApiEndpointItem extends vscode_1.TreeItem {
    static contextValue = 'apiEndpointItem';
    static regExp = new RegExp(ApiEndpointItem.contextValue);
    constructor() {
        super(setApiEndpoint);
    }
    getTreeItem() {
        return {
            id: '/apiEndpoint',
            label: this.label,
            description: settingUtils_1.settingUtils.getApiEndpointBaseUrl(),
            contextValue: ApiEndpointItem.contextValue,
            iconPath: new vscode_1.ThemeIcon('location', 'white'),
            command: {
                title: setApiEndpoint,
                command: 'portfolioInstruments.setApiEndpoint',
                tooltip: vscode_1.l10n.t('Set API Endpoint'),
            }
        };
    }
}
exports.ApiEndpointItem = ApiEndpointItem;


/***/ }),
/* 65 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.registerCommands = registerCommands;
const createAccount_1 = __webpack_require__(66);
const deleteAccount_1 = __webpack_require__(77);
const updateAccount_1 = __webpack_require__(81);
const login_1 = __webpack_require__(84);
const refreshLogin_1 = __webpack_require__(89);
const logout_1 = __webpack_require__(90);
const logoutAll_1 = __webpack_require__(91);
const register_1 = __webpack_require__(92);
const createBenchmark_1 = __webpack_require__(95);
const deleteBenchmark_1 = __webpack_require__(107);
const updateBenchmark_1 = __webpack_require__(111);
const createSnapshotDraft_1 = __webpack_require__(114);
const deploySnapshotDraft_1 = __webpack_require__(121);
const discardSnapshotDraft_1 = __webpack_require__(125);
const editSnapshotDraft_1 = __webpack_require__(126);
const updateSnapshotDraft_1 = __webpack_require__(127);
const createSnapshotValueDraft_1 = __webpack_require__(129);
const deleteSnapshotValueDraft_1 = __webpack_require__(135);
const updateSnapshotValueAmountDraft_1 = __webpack_require__(138);
const updateSnapshotValueDraft_1 = __webpack_require__(140);
const createHolding_1 = __webpack_require__(141);
const deleteHolding_1 = __webpack_require__(151);
const updateHolding_1 = __webpack_require__(155);
const registerCommand_1 = __webpack_require__(158);
const setApiEndpoint_1 = __webpack_require__(162);
const decrementSnapshotPage_1 = __webpack_require__(165);
const deleteSnapshot_1 = __webpack_require__(166);
const incrementSnapshotPage_1 = __webpack_require__(170);
const plotSnapshots_1 = __webpack_require__(171);
const updateMaturationEnd_1 = __webpack_require__(177);
const updateMaturationStart_1 = __webpack_require__(180);
const updateSnapshot_1 = __webpack_require__(182);
const createSnapshotValue_1 = __webpack_require__(185);
const deleteSnapshotValue_1 = __webpack_require__(188);
const updateSnapshotValue_1 = __webpack_require__(192);
const viewProperties_1 = __webpack_require__(195);
const toggleShowDeprecatedResources_1 = __webpack_require__(197);
const undeprecate_1 = __webpack_require__(198);
const refresh_1 = __webpack_require__(199);
const collapseAll_1 = __webpack_require__(200);
function registerCommands() {
    // Auth
    (0, registerCommand_1.registerCommand)('portfolioInstruments.register', register_1.register);
    (0, registerCommand_1.registerCommand)('portfolioInstruments.login', login_1.login);
    (0, registerCommand_1.registerCommand)('portfolioInstruments.refreshLogin', refreshLogin_1.refreshLogin);
    (0, registerCommand_1.registerCommand)('portfolioInstruments.logout', logout_1.logout);
    (0, registerCommand_1.registerCommand)('portfolioInstruments.logoutAll', logoutAll_1.logoutAll);
    // Accounts
    (0, registerCommand_1.registerCommand)('portfolioInstruments.createAccount', createAccount_1.createAccount);
    (0, registerCommand_1.registerCommand)('portfolioInstruments.updateAccount', updateAccount_1.updateAccount);
    (0, registerCommand_1.registerCommand)('portfolioInstruments.deleteAccount', deleteAccount_1.deleteAccount);
    // Holdings
    (0, registerCommand_1.registerCommand)('portfolioInstruments.createHolding', createHolding_1.createHolding);
    (0, registerCommand_1.registerCommand)('portfolioInstruments.updateHolding', updateHolding_1.updateHolding);
    (0, registerCommand_1.registerCommand)('portfolioInstruments.deleteHolding', deleteHolding_1.deleteHolding);
    // Benchmarks 
    (0, registerCommand_1.registerCommand)('portfolioInstruments.createBenchmark', createBenchmark_1.createBenchmark);
    (0, registerCommand_1.registerCommand)('portfolioInstruments.updateBenchmark', updateBenchmark_1.updateBenchmark);
    (0, registerCommand_1.registerCommand)('portfolioInstruments.deleteBenchmark', deleteBenchmark_1.deleteBenchmark);
    // Snapshot draft
    (0, registerCommand_1.registerCommand)('portfolioInstruments.createSnapshotDraft', createSnapshotDraft_1.createSnapshotDraft);
    (0, registerCommand_1.registerCommand)('portfolioInstruments.editSnapshotDraft', editSnapshotDraft_1.editSnapshotDraft);
    (0, registerCommand_1.registerCommand)('portfolioInstruments.discardSnapshotDraft', discardSnapshotDraft_1.discardSnapshotDraft);
    (0, registerCommand_1.registerCommand)('portfolioInstruments.updateSnapshotDraft', updateSnapshotDraft_1.updateSnapshotDraft);
    (0, registerCommand_1.registerCommand)('portfolioInstruments.deploySnapshotDraft', deploySnapshotDraft_1.deploySnapshotDraft);
    // Snapshot values draft
    (0, registerCommand_1.registerCommand)('portfolioInstruments.createSnapshotValueDraft', createSnapshotValueDraft_1.createSnapshotValueDraft);
    (0, registerCommand_1.registerCommand)('portfolioInstruments.updateSnapshotValueDraft', updateSnapshotValueDraft_1.updateSnapshotValueDraft);
    (0, registerCommand_1.registerCommand)('portfolioInstruments.updateSnapshotValueAmountDraft', updateSnapshotValueAmountDraft_1.updateSnapshotValueAmountDraft);
    (0, registerCommand_1.registerCommand)('portfolioInstruments.deleteSnapshotValueDraft', deleteSnapshotValueDraft_1.deleteSnapshotValueDraft);
    // Snapshots
    (0, registerCommand_1.registerCommand)('portfolioInstruments.updateSnapshot', updateSnapshot_1.updateSnapshot);
    (0, registerCommand_1.registerCommand)('portfolioInstruments.deleteSnapshot', deleteSnapshot_1.deleteSnapshot);
    (0, registerCommand_1.registerCommand)('portfolioInstruments.updateMaturationStart', updateMaturationStart_1.updateMaturationStart);
    (0, registerCommand_1.registerCommand)('portfolioInstruments.updateMaturationEnd', updateMaturationEnd_1.updateMaturationEnd);
    (0, registerCommand_1.registerCommand)('portfolioInstruments.incrementSnapshotPage', incrementSnapshotPage_1.incrementSnapshotPage);
    (0, registerCommand_1.registerCommand)('portfolioInstruments.decrementSnapshotPage', decrementSnapshotPage_1.decrementSnapshotPage);
    (0, registerCommand_1.registerCommand)('portfolioInstruments.plotSnapshots', plotSnapshots_1.plotSnapshots); // Webview
    // Snapshot values
    (0, registerCommand_1.registerCommand)('portfolioInstruments.createSnapshotValue', createSnapshotValue_1.createSnapshotValue);
    (0, registerCommand_1.registerCommand)('portfolioInstruments.updateSnapshotValue', updateSnapshotValue_1.updateSnapshotValue);
    (0, registerCommand_1.registerCommand)('portfolioInstruments.deleteSnapshotValue', deleteSnapshotValue_1.deleteSnapshotValue);
    // Other
    (0, registerCommand_1.registerCommand)('portfolioInstruments.viewProperties', viewProperties_1.viewProperties);
    (0, registerCommand_1.registerCommand)('portfolioInstruments.setApiEndpoint', setApiEndpoint_1.setApiEndpoint);
    (0, registerCommand_1.registerCommand)('portfolioInstruments.toggleShowDeprecatedResources', toggleShowDeprecatedResources_1.toggleShowDeprecatedResources);
    (0, registerCommand_1.registerCommand)('portfolioInstruments.undeprecate', undeprecate_1.undeprecate);
    // Refresh
    (0, registerCommand_1.registerCommand)('portfolioInstruments.refresh', refresh_1.refresh);
    (0, registerCommand_1.registerCommand)('portfolioInstruments.refreshSnapshots', refresh_1.refreshNode);
    (0, registerCommand_1.registerCommand)('portfolioInstruments.refreshAccounts', refresh_1.refreshNode);
    (0, registerCommand_1.registerCommand)('portfolioInstruments.refreshHoldings', refresh_1.refreshNode);
    (0, registerCommand_1.registerCommand)('portfolioInstruments.refreshBenchmarks', refresh_1.refreshNode);
    (0, registerCommand_1.registerCommand)('portfolioInstruments.refreshSnapshot', refresh_1.refreshNode);
    (0, registerCommand_1.registerCommand)('portfolioInstruments.collapseAll', collapseAll_1.collapseAll);
}


/***/ }),
/* 66 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createAccount = createAccount;
const vscode_1 = __webpack_require__(1);
const AccountsItem_1 = __webpack_require__(9);
const nonNull_1 = __webpack_require__(12);
const tokenUtils_1 = __webpack_require__(6);
const Wizard_1 = __webpack_require__(67);
const AccountDescriptionStep_1 = __webpack_require__(68);
const AccountInstitutionStep_1 = __webpack_require__(71);
const AccountTaxShelterStep_1 = __webpack_require__(72);
const AccountNameStep_1 = __webpack_require__(74);
const AccountCreateStep_1 = __webpack_require__(75);
const extensionVariables_1 = __webpack_require__(2);
async function createAccount(context, item) {
    const wizardContext = {
        ...context,
        email: item.email,
        token: (0, nonNull_1.nonNullValue)(await (0, tokenUtils_1.getAuthToken)(item.email)),
    };
    const wizard = new Wizard_1.Wizard(wizardContext, {
        title: vscode_1.l10n.t('Create a financial account'),
        promptSteps: [
            new AccountNameStep_1.AccountNameStep(),
            new AccountDescriptionStep_1.AccountDescriptionStep(),
            new AccountInstitutionStep_1.AccountInstitutionStep(),
            new AccountTaxShelterStep_1.AccountTaxShelterStep(),
        ],
        executeSteps: [
            new AccountCreateStep_1.AccountCreateStep(),
        ],
    });
    await wizard.prompt();
    await wizard.execute();
    void context.ui.showInformationMessage(vscode_1.l10n.t('Created account "{0}"', (0, nonNull_1.nonNullValueAndProp)(wizardContext.account, 'name')));
    extensionVariables_1.ext.resourceCache.delete(AccountsItem_1.AccountsItem.generatePiExtAccountsId(wizardContext.email));
    extensionVariables_1.ext.portfolioInstrumentsTdp.refresh(item);
}


/***/ }),
/* 67 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.Wizard = void 0;
const vscode_1 = __webpack_require__(1);
class Wizard {
    context;
    title;
    promptSteps;
    executeSteps;
    constructor(context, options) {
        this.context = context;
        this.title = options.title;
        this.promptSteps = options.promptSteps ?? [];
        this.executeSteps = options.executeSteps ?? [];
    }
    async prompt() {
        this.promptSteps.reverse();
        while (this.promptSteps.length) {
            const s = this.promptSteps.pop();
            if (!s.shouldPrompt(this.context)) {
                continue;
            }
            s.title = this.title;
            await s.prompt(this.context);
            if (s.subWizard) {
                const { promptSteps, executeSteps } = await s.subWizard?.(this.context) ?? { promptSteps: [], executeSteps: [] };
                this.promptSteps.push(...(promptSteps ?? []).reverse());
                this.executeSteps.push(...(executeSteps ?? []));
            }
        }
    }
    async execute() {
        const progressOptions = {
            title: this.title,
            location: vscode_1.ProgressLocation.Notification,
            cancellable: false,
        };
        await vscode_1.window.withProgress(progressOptions, async (progress) => {
            this.executeSteps = this.executeSteps.sort((a, b) => a.priority - b.priority);
            for (const s of this.executeSteps) {
                if (!s.shouldExecute(this.context)) {
                    continue;
                }
                await s.execute(this.context, progress);
            }
        });
    }
}
exports.Wizard = Wizard;


/***/ }),
/* 68 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountDescriptionStep = void 0;
const vscode_1 = __webpack_require__(1);
const PromptStep_1 = __webpack_require__(69);
const validationUtils_1 = __webpack_require__(70);
class AccountDescriptionStep extends PromptStep_1.PromptStep {
    async prompt(context) {
        context.accountDescription = (await context.ui.showInputBox({
            title: this.title,
            value: context.account?.description,
            prompt: vscode_1.l10n.t('Enter an account description'),
            validateInput: this.validateInput,
        }))?.trim();
    }
    shouldPrompt(context) {
        return !context.accountDescription;
    }
    validateInput(value) {
        value = value.trim();
        if (!value) {
            return undefined;
        }
        const tc = {
            upperLimitIncl: 1024,
        };
        if (!validationUtils_1.validationUtils.hasValidCharLength(value, tc)) {
            return validationUtils_1.validationUtils.getInvalidCharLengthMessage(tc);
        }
        return undefined;
    }
}
exports.AccountDescriptionStep = AccountDescriptionStep;


/***/ }),
/* 69 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PromptStep = void 0;
class PromptStep {
    title;
}
exports.PromptStep = PromptStep;


/***/ }),
/* 70 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.validationUtils = void 0;
const vscode = __importStar(__webpack_require__(1));
var validationUtils;
(function (validationUtils) {
    function hasValidCharLength(value, rc) {
        const lowerLimitIncl = (!rc?.lowerLimitIncl) ? 1 : rc.lowerLimitIncl;
        const upperLimitIncl = (!rc?.upperLimitIncl || rc.upperLimitIncl > Number.MAX_SAFE_INTEGER) ? Number.MAX_SAFE_INTEGER : rc.upperLimitIncl;
        if (lowerLimitIncl < 1 || upperLimitIncl < 1) {
            throw new Error(vscode.l10n.t('Specified character lengths should be 1 character or greater.'));
        }
        if (lowerLimitIncl > upperLimitIncl) {
            throw new Error(vscode.l10n.t('The minimum specified character length should not exceed the maximum specified character length.'));
        }
        return value.length >= lowerLimitIncl && value.length <= upperLimitIncl;
    }
    validationUtils.hasValidCharLength = hasValidCharLength;
    function getInvalidCharLengthMessage(rc) {
        if (!rc?.lowerLimitIncl && !rc?.upperLimitIncl) {
            return vscode.l10n.t('A value is required to proceed.');
        }
        else if (rc?.lowerLimitIncl && !rc?.upperLimitIncl) {
            return vscode.l10n.t('The value must be {0} characters or greater.', rc.lowerLimitIncl);
        }
        else if (!rc?.lowerLimitIncl && rc?.upperLimitIncl) {
            return vscode.l10n.t('The value must be {0} characters or less.', rc.upperLimitIncl);
        }
        else {
            return rc.lowerLimitIncl === rc.upperLimitIncl ?
                vscode.l10n.t('The value must be {0} characters long.', rc.lowerLimitIncl) :
                vscode.l10n.t('The value must be between {0} and {1} characters long.', rc.lowerLimitIncl, rc.upperLimitIncl);
        }
    }
    validationUtils.getInvalidCharLengthMessage = getInvalidCharLengthMessage;
})(validationUtils || (exports.validationUtils = validationUtils = {}));


/***/ }),
/* 71 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountInstitutionStep = void 0;
const vscode_1 = __webpack_require__(1);
const PromptStep_1 = __webpack_require__(69);
const validationUtils_1 = __webpack_require__(70);
class AccountInstitutionStep extends PromptStep_1.PromptStep {
    async prompt(context) {
        context.accountInstitution = (await context.ui.showInputBox({
            title: this.title,
            value: context.account?.institution,
            prompt: vscode_1.l10n.t('Enter the account institution'),
            validateInput: this.validateInput,
        }))?.trim();
    }
    shouldPrompt(context) {
        return !context.accountInstitution;
    }
    validateInput(value) {
        value = value.trim();
        const tc = {
            lowerLimitIncl: 1,
            upperLimitIncl: 64,
        };
        if (!validationUtils_1.validationUtils.hasValidCharLength(value, tc)) {
            return validationUtils_1.validationUtils.getInvalidCharLengthMessage(tc);
        }
        return undefined;
    }
}
exports.AccountInstitutionStep = AccountInstitutionStep;


/***/ }),
/* 72 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountTaxShelterStep = void 0;
const vscode_1 = __webpack_require__(1);
const PromptStep_1 = __webpack_require__(69);
const portfolio_instruments_api_1 = __webpack_require__(73);
class AccountTaxShelterStep extends PromptStep_1.PromptStep {
    async prompt(context) {
        context.accountTaxShelter = (await context.ui.showQuickPick(this.getPicks(context), {
            title: this.title,
            placeHolder: vscode_1.l10n.t('Choose a tax shelter type'),
        }))?.data;
    }
    shouldPrompt(context) {
        return !context.accountTaxShelter;
    }
    getPicks(context) {
        const current = '(current)';
        function isCurrent(taxShelter) {
            return context.account?.tax_shelter === taxShelter;
        }
        return [
            { label: portfolio_instruments_api_1.TaxShelter.Taxable, description: isCurrent(portfolio_instruments_api_1.TaxShelter.Taxable) ? current : undefined, data: portfolio_instruments_api_1.TaxShelter.Taxable },
            { label: portfolio_instruments_api_1.TaxShelter.Roth, description: isCurrent(portfolio_instruments_api_1.TaxShelter.Roth) ? current : undefined, data: portfolio_instruments_api_1.TaxShelter.Roth },
            { label: portfolio_instruments_api_1.TaxShelter.Traditional, description: isCurrent(portfolio_instruments_api_1.TaxShelter.Traditional) ? current : undefined, data: portfolio_instruments_api_1.TaxShelter.Traditional },
            { label: portfolio_instruments_api_1.TaxShelter.HSA, description: isCurrent(portfolio_instruments_api_1.TaxShelter.HSA) ? current : undefined, data: portfolio_instruments_api_1.TaxShelter.HSA },
            { label: portfolio_instruments_api_1.TaxShelter.FiveTwentyNine, description: isCurrent(portfolio_instruments_api_1.TaxShelter.FiveTwentyNine) ? current : undefined, data: portfolio_instruments_api_1.TaxShelter.FiveTwentyNine },
        ];
    }
}
exports.AccountTaxShelterStep = AccountTaxShelterStep;


/***/ }),
/* 73 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

// Generated by https://github.com/StirlingMarketingGroup/go2ts
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.TaxShelter = exports.AssetCategory = exports.UserRole = void 0;
// user.go
var UserRole;
(function (UserRole) {
    UserRole["Default"] = "DEFAULT";
    UserRole["Admin"] = "ADMIN";
})(UserRole || (exports.UserRole = UserRole = {}));
// benchmark.go
var AssetCategory;
(function (AssetCategory) {
    AssetCategory["Cash"] = "CASH";
    AssetCategory["Bills"] = "BILLS";
    AssetCategory["STB"] = "STB";
    AssetCategory["ITB"] = "ITB";
    AssetCategory["LTB"] = "LTB";
    AssetCategory["Commodities"] = "COMMODITIES";
    AssetCategory["Gold"] = "GOLD";
    AssetCategory["REITS"] = "REITS";
    AssetCategory["TSM"] = "TSM";
    AssetCategory["DLCB"] = "DLCB";
    AssetCategory["DLCG"] = "DLCG";
    AssetCategory["DLCV"] = "DLCV";
    AssetCategory["DLCM"] = "DLCM";
    AssetCategory["DMCB"] = "DMCB";
    AssetCategory["DMCG"] = "DMCG";
    AssetCategory["DMCV"] = "DMCV";
    AssetCategory["DMCM"] = "DMCM";
    AssetCategory["DSCG"] = "DSCG";
    AssetCategory["DSCB"] = "DSCB";
    AssetCategory["DSCV"] = "DSCV";
    AssetCategory["DSCM"] = "DSCM";
    AssetCategory["ILCB"] = "ILCB";
    AssetCategory["ILCG"] = "ILCG";
    AssetCategory["ILCV"] = "ILCV";
    AssetCategory["ILCM"] = "ILCM";
    AssetCategory["IMCB"] = "IMCB";
    AssetCategory["IMCG"] = "IMCG";
    AssetCategory["IMCV"] = "IMCV";
    AssetCategory["IMCM"] = "IMCM";
    AssetCategory["ISCB"] = "ISCB";
    AssetCategory["ISCG"] = "ISCG";
    AssetCategory["ISCV"] = "ISCV";
    AssetCategory["ISCM"] = "ISCM";
    AssetCategory["Crypto"] = "CRYPTO";
    AssetCategory["Other"] = "OTHER";
})(AssetCategory || (exports.AssetCategory = AssetCategory = {}));
// account.go
var TaxShelter;
(function (TaxShelter) {
    TaxShelter["Taxable"] = "TAXABLE";
    TaxShelter["Traditional"] = "TRADITIONAL";
    TaxShelter["Roth"] = "ROTH";
    TaxShelter["HSA"] = "HSA";
    TaxShelter["FiveTwentyNine"] = "529";
})(TaxShelter || (exports.TaxShelter = TaxShelter = {}));


/***/ }),
/* 74 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountNameStep = void 0;
const vscode_1 = __webpack_require__(1);
const PromptStep_1 = __webpack_require__(69);
const validationUtils_1 = __webpack_require__(70);
class AccountNameStep extends PromptStep_1.PromptStep {
    async prompt(context) {
        context.accountName = (await context.ui.showInputBox({
            title: this.title,
            value: context.account?.name,
            prompt: vscode_1.l10n.t('Enter the account name'),
            validateInput: this.validateInput,
        }))?.trim();
    }
    shouldPrompt(context) {
        return !context.accountName;
    }
    validateInput(value) {
        value = value.trim();
        const tc = {
            lowerLimitIncl: 1,
            upperLimitIncl: 64,
        };
        if (!validationUtils_1.validationUtils.hasValidCharLength(value, tc)) {
            return validationUtils_1.validationUtils.getInvalidCharLengthMessage(tc);
        }
        return undefined;
    }
}
exports.AccountNameStep = AccountNameStep;


/***/ }),
/* 75 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountCreateStep = void 0;
const createAccount_1 = __webpack_require__(76);
const nonNull_1 = __webpack_require__(12);
class AccountCreateStep {
    priority;
    async execute(context, progress) {
        progress.report({ message: "Creating account..." });
        const response = await (0, createAccount_1.createAccount)(context.token, {
            name: (0, nonNull_1.nonNullProp)(context, 'accountName'),
            description: context.accountDescription,
            institution: (0, nonNull_1.nonNullProp)(context, 'accountInstitution'),
            tax_shelter: (0, nonNull_1.nonNullProp)(context, 'accountTaxShelter'),
            is_deprecated: false,
        });
        if (response.error) {
            throw new Error(response.error);
        }
        context.account = response.data?.account;
    }
    shouldExecute(context) {
        return !context.account;
    }
}
exports.AccountCreateStep = AccountCreateStep;


/***/ }),
/* 76 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createAccount = createAccount;
const constants_1 = __webpack_require__(7);
const settingUtils_1 = __webpack_require__(11);
async function createAccount(token, payload) {
    const response = await fetch(`${settingUtils_1.settingUtils.getApiEndpointBaseUrl()}/api/${constants_1.latestApiVersion}/accounts`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });
    return await response.json();
}


/***/ }),
/* 77 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deleteAccount = deleteAccount;
const vscode_1 = __webpack_require__(1);
const nonNull_1 = __webpack_require__(12);
const tokenUtils_1 = __webpack_require__(6);
const Wizard_1 = __webpack_require__(67);
const AccountDeleteConfirmStep_1 = __webpack_require__(78);
const AccountDeleteStep_1 = __webpack_require__(79);
const extensionVariables_1 = __webpack_require__(2);
const AccountsItem_1 = __webpack_require__(9);
async function deleteAccount(context, item) {
    const wizardContext = {
        ...context,
        email: item.email,
        token: (0, nonNull_1.nonNullValue)(await (0, tokenUtils_1.getAuthToken)(item.email)),
        account: item.account,
    };
    const wizard = new Wizard_1.Wizard(wizardContext, {
        title: vscode_1.l10n.t('Create a financial account'),
        promptSteps: [
            new AccountDeleteConfirmStep_1.AccountDeleteConfirmStep(),
        ],
        executeSteps: [
            new AccountDeleteStep_1.AccountDeleteStep(),
        ],
    });
    await wizard.prompt();
    await wizard.execute();
    void context.ui.showInformationMessage(vscode_1.l10n.t('Deleted account "{0}"', (0, nonNull_1.nonNullValueAndProp)(wizardContext.account, 'name')));
    extensionVariables_1.ext.resourceCache.delete(AccountsItem_1.AccountsItem.generatePiExtAccountsId(wizardContext.email));
    extensionVariables_1.ext.portfolioInstrumentsTdp.refresh(item.parent);
}


/***/ }),
/* 78 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountDeleteConfirmStep = void 0;
const vscode_1 = __webpack_require__(1);
const PromptStep_1 = __webpack_require__(69);
class AccountDeleteConfirmStep extends PromptStep_1.PromptStep {
    async prompt(context) {
        const warning = vscode_1.l10n.t('Are you sure you want to delete account "{0}"?', context.account.name);
        await context.ui.showWarningMessage(warning, { modal: true }, vscode_1.l10n.t('Confirm'));
    }
    shouldPrompt() {
        return true;
    }
}
exports.AccountDeleteConfirmStep = AccountDeleteConfirmStep;


/***/ }),
/* 79 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountDeleteStep = void 0;
const vscode_1 = __webpack_require__(1);
const nonNull_1 = __webpack_require__(12);
const deleteAccount_1 = __webpack_require__(80);
class AccountDeleteStep {
    priority;
    async execute(context, progress) {
        progress.report({ message: vscode_1.l10n.t("Deleting account...") });
        const response = await (0, deleteAccount_1.deleteAccount)((0, nonNull_1.nonNullProp)(context, 'token'), context.account.account_id);
        if (response.error) {
            throw new Error(response.error);
        }
    }
    shouldExecute(context) {
        return !!context.account;
    }
}
exports.AccountDeleteStep = AccountDeleteStep;


/***/ }),
/* 80 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deleteAccount = deleteAccount;
const constants_1 = __webpack_require__(7);
const settingUtils_1 = __webpack_require__(11);
async function deleteAccount(token, accountId) {
    const response = await fetch(`${settingUtils_1.settingUtils.getApiEndpointBaseUrl()}/api/${constants_1.latestApiVersion}/accounts/${accountId}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return await response.json();
}


/***/ }),
/* 81 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateAccount = updateAccount;
const vscode_1 = __webpack_require__(1);
const nonNull_1 = __webpack_require__(12);
const tokenUtils_1 = __webpack_require__(6);
const Wizard_1 = __webpack_require__(67);
const extensionVariables_1 = __webpack_require__(2);
const AccountNameStep_1 = __webpack_require__(74);
const AccountDescriptionStep_1 = __webpack_require__(68);
const AccountInstitutionStep_1 = __webpack_require__(71);
const AccountTaxShelterStep_1 = __webpack_require__(72);
const AccountUpdateStep_1 = __webpack_require__(82);
const AccountsItem_1 = __webpack_require__(9);
async function updateAccount(context, item) {
    const wizardContext = {
        ...context,
        email: item.email,
        token: (0, nonNull_1.nonNullValue)(await (0, tokenUtils_1.getAuthToken)(item.email)),
        account: item.account,
    };
    const wizard = new Wizard_1.Wizard(wizardContext, {
        title: vscode_1.l10n.t('Update financial account'),
        promptSteps: [
            new AccountNameStep_1.AccountNameStep(),
            new AccountDescriptionStep_1.AccountDescriptionStep(),
            new AccountInstitutionStep_1.AccountInstitutionStep(),
            new AccountTaxShelterStep_1.AccountTaxShelterStep(),
        ],
        executeSteps: [
            new AccountUpdateStep_1.AccountUpdateStep(),
        ],
    });
    await wizard.prompt();
    await wizard.execute();
    void context.ui.showInformationMessage(vscode_1.l10n.t('Updated account "{0}"', (0, nonNull_1.nonNullValueAndProp)(wizardContext.updatedAccount, 'name')));
    extensionVariables_1.ext.resourceCache.delete(AccountsItem_1.AccountsItem.generatePiExtAccountsId(wizardContext.email));
    extensionVariables_1.ext.portfolioInstrumentsTdp.refresh(item.parent);
}


/***/ }),
/* 82 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountUpdateStep = void 0;
const nonNull_1 = __webpack_require__(12);
const updateAccount_1 = __webpack_require__(83);
class AccountUpdateStep {
    priority;
    async execute(context, progress) {
        progress.report({ message: 'Updating account...' });
        const response = await (0, updateAccount_1.updateAccount)(context.token, context.account.account_id, {
            name: (0, nonNull_1.nonNullProp)(context, 'accountName'),
            description: context.accountDescription,
            institution: (0, nonNull_1.nonNullProp)(context, 'accountInstitution'),
            tax_shelter: (0, nonNull_1.nonNullProp)(context, 'accountTaxShelter'),
            is_deprecated: false,
        });
        if (response.error) {
            throw new Error(response.error);
        }
        context.updatedAccount = response.data?.account;
    }
    shouldExecute(context) {
        return !context.updatedAccount;
    }
}
exports.AccountUpdateStep = AccountUpdateStep;


/***/ }),
/* 83 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateAccount = updateAccount;
const constants_1 = __webpack_require__(7);
const settingUtils_1 = __webpack_require__(11);
async function updateAccount(token, accountId, payload) {
    const response = await fetch(`${settingUtils_1.settingUtils.getApiEndpointBaseUrl()}/api/${constants_1.latestApiVersion}/accounts/${accountId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });
    return await response.json();
}


/***/ }),
/* 84 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.login = login;
const vscode_1 = __webpack_require__(1);
const Wizard_1 = __webpack_require__(67);
const UserEmailStep_1 = __webpack_require__(85);
const UserPasswordStep_1 = __webpack_require__(86);
const LoginUserExecuteStep_1 = __webpack_require__(87);
const nonNull_1 = __webpack_require__(12);
const extensionVariables_1 = __webpack_require__(2);
async function login(context) {
    const wizardContext = context;
    const wizard = new Wizard_1.Wizard(wizardContext, {
        title: vscode_1.l10n.t('Sign in'),
        promptSteps: [
            new UserEmailStep_1.UserEmailStep(),
            new UserPasswordStep_1.UserPasswordStep(),
        ],
        executeSteps: [
            new LoginUserExecuteStep_1.LoginUserExecuteStep(),
        ],
    });
    await wizard.prompt();
    await wizard.execute();
    void context.ui.showInformationMessage(vscode_1.l10n.t('Successfully logged into "{0}"', (0, nonNull_1.nonNullProp)(wizardContext, 'email')));
    extensionVariables_1.ext.portfolioInstrumentsTdp.refresh();
}


/***/ }),
/* 85 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserEmailStep = void 0;
const vscode_1 = __webpack_require__(1);
const validationUtils_1 = __webpack_require__(70);
const PromptStep_1 = __webpack_require__(69);
class UserEmailStep extends PromptStep_1.PromptStep {
    async prompt(context) {
        context.email = (await context.ui.showInputBox({
            title: this.title,
            prompt: vscode_1.l10n.t('Enter an email address'),
            validateInput: this.validateInput,
        }))?.trim();
    }
    shouldPrompt(context) {
        return !context.email && !context.user;
    }
    validateInput(value) {
        value = value.trim();
        if (!validationUtils_1.validationUtils.hasValidCharLength(value)) {
            return validationUtils_1.validationUtils.getInvalidCharLengthMessage();
        }
        const email = /(.+)@[a-z]+\.[a-z]+/;
        if (!email.test(value)) {
            return vscode_1.l10n.t("Unrecognized email address format.");
        }
        return undefined;
    }
}
exports.UserEmailStep = UserEmailStep;


/***/ }),
/* 86 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserPasswordStep = void 0;
const vscode_1 = __webpack_require__(1);
const validationUtils_1 = __webpack_require__(70);
const PromptStep_1 = __webpack_require__(69);
class UserPasswordStep extends PromptStep_1.PromptStep {
    async prompt(context) {
        context.password = (await context.ui.showInputBox({
            title: this.title,
            prompt: vscode_1.l10n.t('Enter a password'),
            password: true,
            validateInput: this.validateInput,
        }));
    }
    shouldPrompt(context) {
        return !context.password && !context.user;
    }
    validateInput(value) {
        const rc = {
            lowerLimitIncl: 5,
            upperLimitIncl: 60,
        };
        if (!validationUtils_1.validationUtils.hasValidCharLength(value, rc)) {
            return validationUtils_1.validationUtils.getInvalidCharLengthMessage(rc);
        }
        return undefined;
    }
}
exports.UserPasswordStep = UserPasswordStep;


/***/ }),
/* 87 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.LoginUserExecuteStep = void 0;
const nonNull_1 = __webpack_require__(12);
const loginUser_1 = __webpack_require__(88);
const tokenUtils_1 = __webpack_require__(6);
class LoginUserExecuteStep {
    priority;
    async execute(context, progress) {
        progress.report({ message: "Signing in..." });
        const response = await (0, loginUser_1.loginUser)({
            email: (0, nonNull_1.nonNullProp)(context, 'email'),
            password: (0, nonNull_1.nonNullProp)(context, 'password'),
        });
        if (response.error) {
            throw new Error(response.error);
        }
        context.token = response.data?.token;
        context.user = response.data?.user;
        await (0, tokenUtils_1.storeAuthToken)((0, nonNull_1.nonNullValueAndProp)(context.user, 'email'), (0, nonNull_1.nonNullProp)(context, 'token'));
    }
    shouldExecute(context) {
        return !context.token;
    }
}
exports.LoginUserExecuteStep = LoginUserExecuteStep;


/***/ }),
/* 88 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.loginUser = loginUser;
const constants_1 = __webpack_require__(7);
const settingUtils_1 = __webpack_require__(11);
async function loginUser(payload) {
    const response = await fetch(`${settingUtils_1.settingUtils.getApiEndpointBaseUrl()}/api/${constants_1.latestApiVersion}/login`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
    return await response.json();
}


/***/ }),
/* 89 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.refreshLogin = refreshLogin;
const vscode_1 = __webpack_require__(1);
const Wizard_1 = __webpack_require__(67);
const UserPasswordStep_1 = __webpack_require__(86);
const LoginUserExecuteStep_1 = __webpack_require__(87);
const nonNull_1 = __webpack_require__(12);
const extensionVariables_1 = __webpack_require__(2);
async function refreshLogin(context, item) {
    const wizardContext = {
        ...context,
        email: item.email,
    };
    const wizard = new Wizard_1.Wizard(wizardContext, {
        title: vscode_1.l10n.t('Sign in'),
        promptSteps: [
            new UserPasswordStep_1.UserPasswordStep(),
        ],
        executeSteps: [
            new LoginUserExecuteStep_1.LoginUserExecuteStep(),
        ],
    });
    await wizard.prompt();
    await wizard.execute();
    void context.ui.showInformationMessage(vscode_1.l10n.t('Successfully logged into "{0}"', (0, nonNull_1.nonNullProp)(wizardContext, 'email')));
    extensionVariables_1.ext.portfolioInstrumentsTdp.refresh(item);
}


/***/ }),
/* 90 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.logout = logout;
const vscode_1 = __webpack_require__(1);
const EmailItem_1 = __webpack_require__(8);
const extensionVariables_1 = __webpack_require__(2);
const tokenUtils_1 = __webpack_require__(6);
const BenchmarksItem_1 = __webpack_require__(24);
const AccountsItem_1 = __webpack_require__(9);
const HoldingsItem_1 = __webpack_require__(20);
async function logout(context, item) {
    await (0, tokenUtils_1.removeAuthToken)(item.email);
    void context.ui.showInformationMessage(vscode_1.l10n.t('Successfully logged out of "{0}"', item.email));
    purgeUserResourceCaches(item.email);
    extensionVariables_1.ext.portfolioInstrumentsTdp.refresh();
}
function purgeUserResourceCaches(email) {
    extensionVariables_1.ext.resourceCache.delete(EmailItem_1.EmailItem.generatePiExtUserId(email));
    extensionVariables_1.ext.resourceCache.delete(BenchmarksItem_1.BenchmarksItem.generatePiExtBenchmarksId(email));
    extensionVariables_1.ext.resourceCache.delete(AccountsItem_1.AccountsItem.generatePiExtAccountsId(email));
    extensionVariables_1.ext.resourceCache.delete(HoldingsItem_1.HoldingsItem.generatePiExtHoldingsId(email));
}


/***/ }),
/* 91 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.logoutAll = logoutAll;
const vscode_1 = __webpack_require__(1);
const tokenUtils_1 = __webpack_require__(6);
const extensionVariables_1 = __webpack_require__(2);
async function logoutAll(context) {
    if (!await (0, tokenUtils_1.hasAuthTokenRecord)()) {
        throw new Error(vscode_1.l10n.t('There are no active accounts to sign out.'));
    }
    await (0, tokenUtils_1.removeAuthTokenRecord)();
    void context.ui.showInformationMessage(vscode_1.l10n.t('Successfully signed out.'));
    extensionVariables_1.ext.resourceCache = new Map(); // Reset / reallocate the cache entirely
    extensionVariables_1.ext.portfolioInstrumentsTdp.refresh();
}


/***/ }),
/* 92 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.register = register;
const Wizard_1 = __webpack_require__(67);
const RegisterUserExecuteStep_1 = __webpack_require__(93);
const vscode_1 = __webpack_require__(1);
const nonNull_1 = __webpack_require__(12);
const UserEmailStep_1 = __webpack_require__(85);
const UserPasswordStep_1 = __webpack_require__(86);
async function register(context) {
    const wizardContext = context;
    const wizard = new Wizard_1.Wizard(wizardContext, {
        title: vscode_1.l10n.t("Register a new user"),
        promptSteps: [
            new UserEmailStep_1.UserEmailStep(),
            new UserPasswordStep_1.UserPasswordStep(),
        ],
        executeSteps: [
            new RegisterUserExecuteStep_1.RegisterUserExecuteStep(),
        ],
    });
    await wizard.prompt();
    await wizard.execute();
    void context.ui.showInformationMessage(vscode_1.l10n.t('Successfully created user "{0}"', (0, nonNull_1.nonNullProp)(wizardContext, 'email')));
}


/***/ }),
/* 93 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.RegisterUserExecuteStep = void 0;
const registerUser_1 = __webpack_require__(94);
const nonNull_1 = __webpack_require__(12);
class RegisterUserExecuteStep {
    priority;
    async execute(context, progress) {
        progress.report({ message: "Registering new user..." });
        const response = await (0, registerUser_1.registerUser)({
            email: (0, nonNull_1.nonNullProp)(context, 'email'),
            password: (0, nonNull_1.nonNullProp)(context, 'password'),
        });
        if (response.error) {
            throw new Error(response.error);
        }
        context.user = response.data?.user;
    }
    shouldExecute(context) {
        return !context.user;
    }
}
exports.RegisterUserExecuteStep = RegisterUserExecuteStep;


/***/ }),
/* 94 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.registerUser = registerUser;
const constants_1 = __webpack_require__(7);
const settingUtils_1 = __webpack_require__(11);
async function registerUser(payload) {
    const response = await fetch(`${settingUtils_1.settingUtils.getApiEndpointBaseUrl()}/api/${constants_1.latestApiVersion}/register`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
    return await response.json();
}


/***/ }),
/* 95 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createBenchmark = createBenchmark;
const vscode_1 = __webpack_require__(1);
const nonNull_1 = __webpack_require__(12);
const tokenUtils_1 = __webpack_require__(6);
const Wizard_1 = __webpack_require__(67);
const BenchmarksItem_1 = __webpack_require__(24);
const extensionVariables_1 = __webpack_require__(2);
const BenchmarkNameStep_1 = __webpack_require__(96);
const BenchmarkDescriptionStep_1 = __webpack_require__(97);
const BenchmarkRealReturnStep_1 = __webpack_require__(98);
const BenchmarkStdDevStep_1 = __webpack_require__(99);
const BenchmarkDrawdownYearsStep_1 = __webpack_require__(100);
const BenchmarkAssetCategoriesStep_1 = __webpack_require__(101);
const BenchmarkAssetAmountsStep_1 = __webpack_require__(102);
const BenchmarkCreateStep_1 = __webpack_require__(103);
const BenchmarkRebalanceThresholdStep_1 = __webpack_require__(106);
async function createBenchmark(context, item) {
    const wizardContext = {
        ...context,
        email: item.email,
        token: (0, nonNull_1.nonNullValue)(await (0, tokenUtils_1.getAuthToken)(item.email)),
    };
    const wizard = new Wizard_1.Wizard(wizardContext, {
        title: vscode_1.l10n.t('Create a benchmark'),
        promptSteps: [
            new BenchmarkNameStep_1.BenchmarkNameStep(),
            new BenchmarkDescriptionStep_1.BenchmarkDescriptionStep(),
            new BenchmarkAssetCategoriesStep_1.BenchmarkAssetCategoriesStep(),
            new BenchmarkAssetAmountsStep_1.BenchmarkAssetAmountsStep(),
            new BenchmarkRebalanceThresholdStep_1.BenchmarkRebalanceThresholdStep(),
            new BenchmarkRealReturnStep_1.BenchmarkRealReturnStep(),
            new BenchmarkStdDevStep_1.BenchmarkStdDevStep(),
            new BenchmarkDrawdownYearsStep_1.BenchmarkDrawdownYearsStep(),
        ],
        executeSteps: [
            new BenchmarkCreateStep_1.BenchmarkCreateStep(),
        ],
    });
    await wizard.prompt();
    await wizard.execute();
    void context.ui.showInformationMessage(vscode_1.l10n.t('Created benchmark "{0}"', (0, nonNull_1.nonNullValueAndProp)(wizardContext.benchmark, 'name')));
    extensionVariables_1.ext.resourceCache.delete(BenchmarksItem_1.BenchmarksItem.generatePiExtBenchmarksId(wizardContext.email));
    extensionVariables_1.ext.portfolioInstrumentsTdp.refresh(item);
}


/***/ }),
/* 96 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BenchmarkNameStep = void 0;
const vscode_1 = __webpack_require__(1);
const PromptStep_1 = __webpack_require__(69);
const validationUtils_1 = __webpack_require__(70);
class BenchmarkNameStep extends PromptStep_1.PromptStep {
    async prompt(context) {
        context.benchmarkName = (await context.ui.showInputBox({
            title: this.title,
            value: context.benchmark?.name,
            prompt: vscode_1.l10n.t('Enter benchmark name'),
            validateInput: this.validateInput,
        }))?.trim();
    }
    shouldPrompt(context) {
        return !context.benchmarkName;
    }
    validateInput(value) {
        value = value.trim();
        const tc = {
            lowerLimitIncl: 1,
            upperLimitIncl: 64,
        };
        if (!validationUtils_1.validationUtils.hasValidCharLength(value, tc)) {
            return validationUtils_1.validationUtils.getInvalidCharLengthMessage(tc);
        }
        return undefined;
    }
}
exports.BenchmarkNameStep = BenchmarkNameStep;


/***/ }),
/* 97 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BenchmarkDescriptionStep = void 0;
const vscode_1 = __webpack_require__(1);
const PromptStep_1 = __webpack_require__(69);
const validationUtils_1 = __webpack_require__(70);
class BenchmarkDescriptionStep extends PromptStep_1.PromptStep {
    async prompt(context) {
        context.benchmarkDescription = (await context.ui.showInputBox({
            title: this.title,
            value: context.benchmark?.description,
            prompt: vscode_1.l10n.t('Enter benchmark description'),
            validateInput: this.validateInput,
        }))?.trim();
    }
    shouldPrompt(context) {
        return !context.benchmarkDescription;
    }
    validateInput(value) {
        value = value.trim();
        if (!value) {
            return undefined;
        }
        if (!validationUtils_1.validationUtils.hasValidCharLength(value)) {
            return validationUtils_1.validationUtils.getInvalidCharLengthMessage();
        }
        return undefined;
    }
}
exports.BenchmarkDescriptionStep = BenchmarkDescriptionStep;


/***/ }),
/* 98 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BenchmarkRealReturnStep = void 0;
const vscode_1 = __webpack_require__(1);
const PromptStep_1 = __webpack_require__(69);
const validationUtils_1 = __webpack_require__(70);
class BenchmarkRealReturnStep extends PromptStep_1.PromptStep {
    async prompt(context) {
        context.benchmarkRealReturn = Number((await context.ui.showInputBox({
            title: this.title,
            value: String(context.benchmark?.real_return_pct ?? 0),
            prompt: vscode_1.l10n.t('Enter benchmark\'s expected real return (%)'),
            validateInput: this.validateInput,
        })));
    }
    shouldPrompt(context) {
        return !context.benchmarkRealReturn;
    }
    validateInput(value) {
        if (!validationUtils_1.validationUtils.hasValidCharLength(value)) {
            return validationUtils_1.validationUtils.getInvalidCharLengthMessage();
        }
        if (isNaN(Number(value))) {
            return vscode_1.l10n.t('Value must have a number format.');
        }
        const num = Number(value);
        if (num < 0 || num > 100) {
            return vscode_1.l10n.t('Value must be between 0 and 100.');
        }
        return undefined;
    }
}
exports.BenchmarkRealReturnStep = BenchmarkRealReturnStep;


/***/ }),
/* 99 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BenchmarkStdDevStep = void 0;
const vscode_1 = __webpack_require__(1);
const PromptStep_1 = __webpack_require__(69);
const validationUtils_1 = __webpack_require__(70);
class BenchmarkStdDevStep extends PromptStep_1.PromptStep {
    async prompt(context) {
        context.benchmarkStdDev = Number((await context.ui.showInputBox({
            title: this.title,
            value: String(context.benchmark?.std_dev_pct ?? 0),
            prompt: vscode_1.l10n.t('Enter benchmark\'s standard deviation (%)'),
            validateInput: this.validateInput,
        })));
    }
    shouldPrompt(context) {
        return !context.benchmarkStdDev;
    }
    validateInput(value) {
        if (!validationUtils_1.validationUtils.hasValidCharLength(value)) {
            return validationUtils_1.validationUtils.getInvalidCharLengthMessage();
        }
        if (isNaN(Number(value))) {
            return vscode_1.l10n.t('Value must have a number format.');
        }
        const num = Number(value);
        if (num < 0 || num > 100) {
            return vscode_1.l10n.t('Value must be between 0 and 100.');
        }
        return undefined;
    }
}
exports.BenchmarkStdDevStep = BenchmarkStdDevStep;


/***/ }),
/* 100 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BenchmarkDrawdownYearsStep = void 0;
const vscode_1 = __webpack_require__(1);
const PromptStep_1 = __webpack_require__(69);
const validationUtils_1 = __webpack_require__(70);
class BenchmarkDrawdownYearsStep extends PromptStep_1.PromptStep {
    async prompt(context) {
        context.benchmarkDrawdownYears = Number((await context.ui.showInputBox({
            title: this.title,
            value: String(context.benchmark?.drawdown_yrs ?? 0),
            prompt: vscode_1.l10n.t('Enter benchmark\'s longest drawdown (yrs)'),
            validateInput: this.validateInput,
        }))?.trim());
    }
    shouldPrompt(context) {
        return !context.benchmarkDrawdownYears;
    }
    validateInput(value) {
        value = value.trim();
        if (!value) {
            return undefined;
        }
        if (!validationUtils_1.validationUtils.hasValidCharLength(value)) {
            return validationUtils_1.validationUtils.getInvalidCharLengthMessage();
        }
        const pattern = /^\d+$/;
        if (!pattern.test(value)) {
            return vscode_1.l10n.t('Value must be a positive whole number.');
        }
        const num = Number(value);
        if (num < 0 || num > 50) {
            return vscode_1.l10n.t('Value must be between 0 and 50.');
        }
        return undefined;
    }
}
exports.BenchmarkDrawdownYearsStep = BenchmarkDrawdownYearsStep;


/***/ }),
/* 101 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BenchmarkAssetCategoriesStep = void 0;
const PromptStep_1 = __webpack_require__(69);
const vscode_1 = __webpack_require__(1);
const portfolio_instruments_api_1 = __webpack_require__(73);
class BenchmarkAssetCategoriesStep extends PromptStep_1.PromptStep {
    async prompt(context) {
        const assets = await context.ui.showQuickPick(this.getPicks(context), {
            title: this.title,
            placeHolder: vscode_1.l10n.t('Select benchmark asset categories'),
            canPickMany: true,
        }) ?? [];
        context.benchmarkAssets = assets.map(a => a.data);
    }
    shouldPrompt(context) {
        return !context.benchmarkAssets;
    }
    getPicks(context) {
        const currentAllocations = context.benchmark?.asset_allocation ?? [];
        const categories = new Set();
        for (const b of currentAllocations) {
            categories.add(b.category);
        }
        return [
            { label: "Cash", description: "CASH", picked: categories.has(portfolio_instruments_api_1.AssetCategory.Cash), data: portfolio_instruments_api_1.AssetCategory.Cash },
            { label: "Bills", description: "BILLS", picked: categories.has(portfolio_instruments_api_1.AssetCategory.Bills), data: portfolio_instruments_api_1.AssetCategory.Bills },
            { label: "Short-Term Bonds", description: "STB", picked: categories.has(portfolio_instruments_api_1.AssetCategory.STB), data: portfolio_instruments_api_1.AssetCategory.STB },
            { label: "Intermediate-Term Bonds", description: "ITB", picked: categories.has(portfolio_instruments_api_1.AssetCategory.ITB), data: portfolio_instruments_api_1.AssetCategory.ITB },
            { label: "Long-Term Bonds", description: "LTB", picked: categories.has(portfolio_instruments_api_1.AssetCategory.LTB), data: portfolio_instruments_api_1.AssetCategory.LTB },
            { label: "Total Stock Market", description: "TSM", picked: categories.has(portfolio_instruments_api_1.AssetCategory.TSM), data: portfolio_instruments_api_1.AssetCategory.TSM },
            { label: "Domestic Large-Cap Blend", description: "DLCB", picked: categories.has(portfolio_instruments_api_1.AssetCategory.DLCB), data: portfolio_instruments_api_1.AssetCategory.DLCB },
            { label: "Domestic Large-Cap Growth", description: "DLCG", picked: categories.has(portfolio_instruments_api_1.AssetCategory.DLCG), data: portfolio_instruments_api_1.AssetCategory.DLCG },
            { label: "Domestic Large-Cap Value", description: "DLCV", picked: categories.has(portfolio_instruments_api_1.AssetCategory.DLCV), data: portfolio_instruments_api_1.AssetCategory.DLCV },
            { label: "Domestic Large-Cap Momentum", description: "DLCM", picked: categories.has(portfolio_instruments_api_1.AssetCategory.DLCM), data: portfolio_instruments_api_1.AssetCategory.DLCM },
            { label: "Domestic Mid-Cap Blend", description: "DMCB", picked: categories.has(portfolio_instruments_api_1.AssetCategory.DMCB), data: portfolio_instruments_api_1.AssetCategory.DMCB },
            { label: "Domestic Mid-Cap Growth", description: "DMCG", picked: categories.has(portfolio_instruments_api_1.AssetCategory.DMCG), data: portfolio_instruments_api_1.AssetCategory.DMCG },
            { label: "Domestic Mid-Cap Value", description: "DMCV", picked: categories.has(portfolio_instruments_api_1.AssetCategory.DMCV), data: portfolio_instruments_api_1.AssetCategory.DMCV },
            { label: "Domestic Mid-Cap Momentum", description: "DMCM", picked: categories.has(portfolio_instruments_api_1.AssetCategory.DMCM), data: portfolio_instruments_api_1.AssetCategory.DMCM },
            { label: "Domestic Small-Cap Growth", description: "DSCG", picked: categories.has(portfolio_instruments_api_1.AssetCategory.DSCG), data: portfolio_instruments_api_1.AssetCategory.DSCG },
            { label: "Domestic Small-Cap Bonds", description: "DSCB", picked: categories.has(portfolio_instruments_api_1.AssetCategory.DSCB), data: portfolio_instruments_api_1.AssetCategory.DSCB },
            { label: "Domestic Small-Cap Value", description: "DSCV", picked: categories.has(portfolio_instruments_api_1.AssetCategory.DSCV), data: portfolio_instruments_api_1.AssetCategory.DSCV },
            { label: "Domestic Small-Cap Momentum", description: "DSCM", picked: categories.has(portfolio_instruments_api_1.AssetCategory.DSCM), data: portfolio_instruments_api_1.AssetCategory.DSCM },
            { label: "International Large-Cap Blend", description: "ILCB", picked: categories.has(portfolio_instruments_api_1.AssetCategory.ILCB), data: portfolio_instruments_api_1.AssetCategory.ILCB },
            { label: "International Large-Cap Growth", description: "ILCG", picked: categories.has(portfolio_instruments_api_1.AssetCategory.ILCG), data: portfolio_instruments_api_1.AssetCategory.ILCG },
            { label: "International Large-Cap Value", description: "ILCV", picked: categories.has(portfolio_instruments_api_1.AssetCategory.ILCV), data: portfolio_instruments_api_1.AssetCategory.ILCV },
            { label: "International Large-Cap Momentum", description: "ILCM", picked: categories.has(portfolio_instruments_api_1.AssetCategory.ILCM), data: portfolio_instruments_api_1.AssetCategory.ILCM },
            { label: "International Mid-Cap Blend", description: "IMCB", picked: categories.has(portfolio_instruments_api_1.AssetCategory.IMCB), data: portfolio_instruments_api_1.AssetCategory.IMCB },
            { label: "International Mid-Cap Growth", description: "IMCG", picked: categories.has(portfolio_instruments_api_1.AssetCategory.IMCG), data: portfolio_instruments_api_1.AssetCategory.IMCG },
            { label: "International Mid-Cap Value", description: "IMCV", picked: categories.has(portfolio_instruments_api_1.AssetCategory.IMCV), data: portfolio_instruments_api_1.AssetCategory.IMCV },
            { label: "International Mid-Cap Momentum", description: "IMCM", picked: categories.has(portfolio_instruments_api_1.AssetCategory.IMCM), data: portfolio_instruments_api_1.AssetCategory.IMCM },
            { label: "International Small-Cap Blend", description: "ISCB", picked: categories.has(portfolio_instruments_api_1.AssetCategory.ISCB), data: portfolio_instruments_api_1.AssetCategory.ISCB },
            { label: "International Small-Cap Growth", description: "ISCG", picked: categories.has(portfolio_instruments_api_1.AssetCategory.ISCG), data: portfolio_instruments_api_1.AssetCategory.ISCG },
            { label: "International Small-Cap Value", description: "ISCV", picked: categories.has(portfolio_instruments_api_1.AssetCategory.ISCV), data: portfolio_instruments_api_1.AssetCategory.ISCV },
            { label: "International Small-Cap Momentum", description: "ISCM", picked: categories.has(portfolio_instruments_api_1.AssetCategory.ISCM), data: portfolio_instruments_api_1.AssetCategory.ISCM },
            { label: "Commodities", description: "COMMODITIES", picked: categories.has(portfolio_instruments_api_1.AssetCategory.Commodities), data: portfolio_instruments_api_1.AssetCategory.Commodities },
            { label: "Gold", description: "GOLD", picked: categories.has(portfolio_instruments_api_1.AssetCategory.Gold), data: portfolio_instruments_api_1.AssetCategory.Gold },
            { label: "Real-Estate Investment Trusts", description: "REITS", picked: categories.has(portfolio_instruments_api_1.AssetCategory.REITS), data: portfolio_instruments_api_1.AssetCategory.REITS },
            { label: "Crypto Currency", description: "CRYPTO", picked: categories.has(portfolio_instruments_api_1.AssetCategory.Crypto), data: portfolio_instruments_api_1.AssetCategory.Crypto },
            { label: "Other", description: "OTHER", picked: categories.has(portfolio_instruments_api_1.AssetCategory.Other), data: portfolio_instruments_api_1.AssetCategory.Other },
        ];
    }
}
exports.BenchmarkAssetCategoriesStep = BenchmarkAssetCategoriesStep;


/***/ }),
/* 102 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BenchmarkAssetAmountsStep = void 0;
const PromptStep_1 = __webpack_require__(69);
const vscode_1 = __webpack_require__(1);
const nonNull_1 = __webpack_require__(12);
class BenchmarkAssetAmountsStep extends PromptStep_1.PromptStep {
    invalidInputMessage;
    numberOfAssets;
    async prompt(context) {
        const benchmarkAssets = (0, nonNull_1.nonNullProp)(context, 'benchmarkAssets');
        this.invalidInputMessage = benchmarkAssets.join(',');
        this.numberOfAssets = benchmarkAssets.length;
        const assetAmounts = (await context.ui.showInputBox({
            title: this.title,
            prompt: vscode_1.l10n.t('Enter benchmark asset amounts as comma-separated integers (%)'),
            value: context.benchmark?.asset_allocation.map(a => a.percent).join(','),
            placeHolder: vscode_1.l10n.t('e.g. 25,25,25,25'),
            validateInput: this.validateInput.bind(this),
        }))?.trim();
        context.benchmarkAssetAmounts = (0, nonNull_1.nonNullValue)(assetAmounts)
            .split(',')
            .map(v => Number(v));
    }
    shouldPrompt(context) {
        return !context.benchmarkAssetAmounts;
    }
    validateInput(value) {
        value = value.trim();
        const pattern = /^\d{1,3}(\,\d{1,2})*?$/;
        if (!pattern.test(value)) {
            return this.invalidInputMessage;
        }
        const values = value.split(',');
        if (values.length !== this.numberOfAssets) {
            return this.invalidInputMessage;
        }
        const sum = values
            .map(v => Number(v))
            .reduce((a, b) => a + b, 0);
        if (sum !== 100) {
            return this.invalidInputMessage;
        }
        return undefined;
    }
}
exports.BenchmarkAssetAmountsStep = BenchmarkAssetAmountsStep;


/***/ }),
/* 103 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BenchmarkCreateStep = void 0;
const vscode_1 = __webpack_require__(1);
const ExecuteStep_1 = __webpack_require__(104);
const createBenchmark_1 = __webpack_require__(105);
const nonNull_1 = __webpack_require__(12);
class BenchmarkCreateStep extends ExecuteStep_1.ExecuteStep {
    priority;
    async execute(context, progress) {
        progress.report({ message: "Creating benchmark..." });
        const benchmarkAssets = (0, nonNull_1.nonNullProp)(context, 'benchmarkAssets');
        const benchmarkAssetAmounts = (0, nonNull_1.nonNullProp)(context, 'benchmarkAssetAmounts');
        if (benchmarkAssets.length !== benchmarkAssetAmounts.length) {
            throw new Error(vscode_1.l10n.t('Invalid benchmark asset allocation provided.'));
        }
        const assetAllocation = [];
        for (let i = 0; i < benchmarkAssets.length; i++) {
            assetAllocation.push({
                category: benchmarkAssets[i],
                percent: benchmarkAssetAmounts[i],
            });
        }
        const response = await (0, createBenchmark_1.createBenchmark)(context.token, {
            name: (0, nonNull_1.nonNullProp)(context, 'benchmarkName'),
            description: context.benchmarkDescription,
            asset_allocation: assetAllocation,
            real_return_pct: context.benchmarkRealReturn,
            std_dev_pct: context.benchmarkStdDev,
            drawdown_yrs: context.benchmarkDrawdownYears,
            rec_rebalance_threshold_pct: context.benchmarkRebalanceThresholdPct,
            is_deprecated: false,
        });
        if (response.error) {
            throw new Error(response.error);
        }
        context.benchmark = response.data?.benchmark;
    }
    shouldExecute(context) {
        return !context.benchmark;
    }
}
exports.BenchmarkCreateStep = BenchmarkCreateStep;


/***/ }),
/* 104 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ExecuteStep = void 0;
class ExecuteStep {
}
exports.ExecuteStep = ExecuteStep;


/***/ }),
/* 105 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createBenchmark = createBenchmark;
const constants_1 = __webpack_require__(7);
const settingUtils_1 = __webpack_require__(11);
async function createBenchmark(token, payload) {
    const response = await fetch(`${settingUtils_1.settingUtils.getApiEndpointBaseUrl()}/api/${constants_1.latestApiVersion}/benchmarks`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });
    return await response.json();
}


/***/ }),
/* 106 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BenchmarkRebalanceThresholdStep = void 0;
const vscode_1 = __webpack_require__(1);
const PromptStep_1 = __webpack_require__(69);
const validationUtils_1 = __webpack_require__(70);
class BenchmarkRebalanceThresholdStep extends PromptStep_1.PromptStep {
    async prompt(context) {
        context.benchmarkRebalanceThresholdPct = Number((await context.ui.showInputBox({
            title: this.title,
            prompt: vscode_1.l10n.t('Enter benchmark\'s recommended rebalance threshold (%)'),
            value: context.benchmark?.rec_rebalance_threshold_pct?.toString(),
            validateInput: this.validateInput,
        })));
    }
    shouldPrompt(context) {
        return !context.benchmarkRebalanceThresholdPct;
    }
    validateInput(value) {
        if (!validationUtils_1.validationUtils.hasValidCharLength(value)) {
            return validationUtils_1.validationUtils.getInvalidCharLengthMessage();
        }
        const num = Number(value);
        if (isNaN(num) || !Number.isInteger(num)) {
            return vscode_1.l10n.t('Value must be a whole number.');
        }
        if (num < 1 || num > 99) {
            return vscode_1.l10n.t('Value must be between 1 and 99.');
        }
        return undefined;
    }
}
exports.BenchmarkRebalanceThresholdStep = BenchmarkRebalanceThresholdStep;


/***/ }),
/* 107 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deleteBenchmark = deleteBenchmark;
const vscode_1 = __webpack_require__(1);
const nonNull_1 = __webpack_require__(12);
const tokenUtils_1 = __webpack_require__(6);
const Wizard_1 = __webpack_require__(67);
const extensionVariables_1 = __webpack_require__(2);
const BenchmarkDeleteConfirmStep_1 = __webpack_require__(108);
const BenchmarkDeleteStep_1 = __webpack_require__(109);
const BenchmarksItem_1 = __webpack_require__(24);
async function deleteBenchmark(context, item) {
    const wizardContext = {
        ...context,
        email: item.email,
        token: (0, nonNull_1.nonNullValue)(await (0, tokenUtils_1.getAuthToken)(item.email)),
        benchmark: item.benchmark,
    };
    const wizard = new Wizard_1.Wizard(wizardContext, {
        title: vscode_1.l10n.t('Create a financial account'),
        promptSteps: [
            new BenchmarkDeleteConfirmStep_1.BenchmarkDeleteConfirmStep(),
        ],
        executeSteps: [
            new BenchmarkDeleteStep_1.BenchmarkDeleteStep(),
        ],
    });
    await wizard.prompt();
    await wizard.execute();
    void context.ui.showInformationMessage(vscode_1.l10n.t('Deleted benchmark "{0}"', (0, nonNull_1.nonNullValueAndProp)(wizardContext.benchmark, 'name')));
    extensionVariables_1.ext.resourceCache.delete(BenchmarksItem_1.BenchmarksItem.generatePiExtBenchmarksId(wizardContext.email));
    extensionVariables_1.ext.portfolioInstrumentsTdp.refresh(item.parent);
}


/***/ }),
/* 108 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BenchmarkDeleteConfirmStep = void 0;
const vscode_1 = __webpack_require__(1);
const PromptStep_1 = __webpack_require__(69);
class BenchmarkDeleteConfirmStep extends PromptStep_1.PromptStep {
    async prompt(context) {
        const warning = vscode_1.l10n.t('Are you sure you want to delete benchmark "{0}"?', context.benchmark.name);
        await context.ui.showWarningMessage(warning, { modal: true }, vscode_1.l10n.t('Confirm'));
    }
    shouldPrompt() {
        return true;
    }
}
exports.BenchmarkDeleteConfirmStep = BenchmarkDeleteConfirmStep;


/***/ }),
/* 109 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BenchmarkDeleteStep = void 0;
const vscode_1 = __webpack_require__(1);
const nonNull_1 = __webpack_require__(12);
const deleteBenchmark_1 = __webpack_require__(110);
class BenchmarkDeleteStep {
    priority;
    async execute(context, progress) {
        progress.report({ message: vscode_1.l10n.t("Deleting benchmark...") });
        const response = await (0, deleteBenchmark_1.deleteBenchmark)((0, nonNull_1.nonNullProp)(context, 'token'), context.benchmark.benchmark_id);
        if (response.error) {
            throw new Error(response.error);
        }
    }
    shouldExecute(context) {
        return !!context.benchmark;
    }
}
exports.BenchmarkDeleteStep = BenchmarkDeleteStep;


/***/ }),
/* 110 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deleteBenchmark = deleteBenchmark;
const constants_1 = __webpack_require__(7);
const settingUtils_1 = __webpack_require__(11);
async function deleteBenchmark(token, benchmarkId) {
    const response = await fetch(`${settingUtils_1.settingUtils.getApiEndpointBaseUrl()}/api/${constants_1.latestApiVersion}/benchmarks/${benchmarkId}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return await response.json();
}


/***/ }),
/* 111 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateBenchmark = updateBenchmark;
const vscode_1 = __webpack_require__(1);
const nonNull_1 = __webpack_require__(12);
const tokenUtils_1 = __webpack_require__(6);
const Wizard_1 = __webpack_require__(67);
const BenchmarksItem_1 = __webpack_require__(24);
const extensionVariables_1 = __webpack_require__(2);
const BenchmarkNameStep_1 = __webpack_require__(96);
const BenchmarkDescriptionStep_1 = __webpack_require__(97);
const BenchmarkAssetCategoriesStep_1 = __webpack_require__(101);
const BenchmarkAssetAmountsStep_1 = __webpack_require__(102);
const BenchmarkRealReturnStep_1 = __webpack_require__(98);
const BenchmarkStdDevStep_1 = __webpack_require__(99);
const BenchmarkDrawdownYearsStep_1 = __webpack_require__(100);
const BenchmarkUpdateStep_1 = __webpack_require__(112);
const BenchmarkRebalanceThresholdStep_1 = __webpack_require__(106);
async function updateBenchmark(context, item) {
    const wizardContext = {
        ...context,
        email: item.email,
        token: (0, nonNull_1.nonNullValue)(await (0, tokenUtils_1.getAuthToken)(item.email)),
        benchmark: item.benchmark,
    };
    const wizard = new Wizard_1.Wizard(wizardContext, {
        title: vscode_1.l10n.t('Update benchmark'),
        promptSteps: [
            new BenchmarkNameStep_1.BenchmarkNameStep(),
            new BenchmarkDescriptionStep_1.BenchmarkDescriptionStep(),
            new BenchmarkAssetCategoriesStep_1.BenchmarkAssetCategoriesStep(),
            new BenchmarkAssetAmountsStep_1.BenchmarkAssetAmountsStep(),
            new BenchmarkRebalanceThresholdStep_1.BenchmarkRebalanceThresholdStep(),
            new BenchmarkRealReturnStep_1.BenchmarkRealReturnStep(),
            new BenchmarkStdDevStep_1.BenchmarkStdDevStep(),
            new BenchmarkDrawdownYearsStep_1.BenchmarkDrawdownYearsStep(),
        ],
        executeSteps: [
            new BenchmarkUpdateStep_1.BenchmarkUpdateStep(),
        ],
    });
    await wizard.prompt();
    await wizard.execute();
    void context.ui.showInformationMessage(vscode_1.l10n.t('Updated benchmark "{0}"', (0, nonNull_1.nonNullValueAndProp)(wizardContext.updatedBenchmark, 'name')));
    extensionVariables_1.ext.resourceCache.delete(BenchmarksItem_1.BenchmarksItem.generatePiExtBenchmarksId(wizardContext.email));
    extensionVariables_1.ext.portfolioInstrumentsTdp.refresh(item.parent);
}


/***/ }),
/* 112 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BenchmarkUpdateStep = void 0;
const vscode_1 = __webpack_require__(1);
const ExecuteStep_1 = __webpack_require__(104);
const nonNull_1 = __webpack_require__(12);
const updateBenchmark_1 = __webpack_require__(113);
class BenchmarkUpdateStep extends ExecuteStep_1.ExecuteStep {
    priority;
    async execute(context, progress) {
        progress.report({ message: "Updating benchmark..." });
        const benchmarkAssets = (0, nonNull_1.nonNullProp)(context, 'benchmarkAssets');
        const benchmarkAssetAmounts = (0, nonNull_1.nonNullProp)(context, 'benchmarkAssetAmounts');
        if (benchmarkAssets.length !== benchmarkAssetAmounts.length) {
            throw new Error(vscode_1.l10n.t('Invalid benchmark asset allocation provided.'));
        }
        const assetAllocation = [];
        for (let i = 0; i < benchmarkAssets.length; i++) {
            assetAllocation.push({
                category: benchmarkAssets[i],
                percent: benchmarkAssetAmounts[i],
            });
        }
        const response = await (0, updateBenchmark_1.updateBenchmark)(context.token, context.benchmark.benchmark_id, {
            name: (0, nonNull_1.nonNullProp)(context, 'benchmarkName'),
            description: context.benchmarkDescription,
            asset_allocation: assetAllocation,
            rec_rebalance_threshold_pct: context.benchmarkRebalanceThresholdPct,
            real_return_pct: context.benchmarkRealReturn,
            std_dev_pct: context.benchmarkStdDev,
            drawdown_yrs: context.benchmarkDrawdownYears,
            is_deprecated: !!context.benchmark.is_deprecated,
        });
        if (response.error) {
            throw new Error(response.error);
        }
        context.updatedBenchmark = response.data?.benchmark;
    }
    shouldExecute(context) {
        return !context.updatedBenchmark;
    }
}
exports.BenchmarkUpdateStep = BenchmarkUpdateStep;


/***/ }),
/* 113 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateBenchmark = updateBenchmark;
const constants_1 = __webpack_require__(7);
const settingUtils_1 = __webpack_require__(11);
async function updateBenchmark(token, benchmarkId, payload) {
    const response = await fetch(`${settingUtils_1.settingUtils.getApiEndpointBaseUrl()}/api/${constants_1.latestApiVersion}/benchmarks/${benchmarkId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });
    return await response.json();
}


/***/ }),
/* 114 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createSnapshotDraft = createSnapshotDraft;
const vscode_1 = __webpack_require__(1);
const extensionVariables_1 = __webpack_require__(2);
const nonNull_1 = __webpack_require__(12);
const tokenUtils_1 = __webpack_require__(6);
const Wizard_1 = __webpack_require__(67);
const SnapshotDateStep_1 = __webpack_require__(115);
const SnapshotDescriptionStep_1 = __webpack_require__(119);
const SnapshotDraftCreateStep_1 = __webpack_require__(120);
async function createSnapshotDraft(context, item) {
    if (extensionVariables_1.ext.snapshotDraftFileSystem.hasSnapshotDraft(item.email)) {
        throw new Error(vscode_1.l10n.t('An existing snapshot draft is already active for this email.'));
    }
    const wizardContext = {
        ...context,
        token: (0, nonNull_1.nonNullValue)(await (0, tokenUtils_1.getAuthToken)(item.email)),
        email: item.email,
    };
    const wizard = new Wizard_1.Wizard(wizardContext, {
        title: vscode_1.l10n.t('Create a snapshot'),
        promptSteps: [
            new SnapshotDateStep_1.SnapshotDateStep(),
            new SnapshotDescriptionStep_1.SnapshotDescriptionStep(),
        ],
        executeSteps: [
            new SnapshotDraftCreateStep_1.SnapshotDraftCreateStep(item),
        ],
    });
    await wizard.prompt();
    await wizard.execute();
    void context.ui.showInformationMessage(vscode_1.l10n.t('Created snapshot draft dated "{0}"', (0, nonNull_1.nonNullProp)(wizardContext, 'snapDate')));
}


/***/ }),
/* 115 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotDateStep = void 0;
const vscode_1 = __webpack_require__(1);
const PromptStep_1 = __webpack_require__(69);
const validationUtils_1 = __webpack_require__(70);
const getSnapshots_1 = __webpack_require__(29);
const BenchmarkListStep_1 = __webpack_require__(116);
const SnapshotRebalanceThresholdStep_1 = __webpack_require__(117);
class SnapshotDateStep extends PromptStep_1.PromptStep {
    options;
    constructor(options) {
        super();
        this.options = options;
    }
    async prompt(context) {
        context.snapDate = (await context.ui.showInputBox({
            title: this.title,
            value: this.options?.defaultDate ?? this.getTodaysDateFormatted(),
            prompt: vscode_1.l10n.t('Enter the snapshot date (mm/dd/yyyy)'),
            validateInput: this.validateInput,
        }))?.trim();
    }
    shouldPrompt(context) {
        return !context.snapDate;
    }
    validateInput(value) {
        value = value.trim();
        const tc = {
            lowerLimitIncl: 10,
            upperLimitIncl: 10,
        };
        if (!validationUtils_1.validationUtils.hasValidCharLength(value, tc)) {
            return validationUtils_1.validationUtils.getInvalidCharLengthMessage(tc);
        }
        const pattern = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!pattern.test(value)) {
            return vscode_1.l10n.t('Value must have the following format: mm/dd/yyyy');
        }
        const [month, day, year] = value.split('/').map(Number);
        const date = new Date(year, month - 1, day);
        // If the date is not a valid calendar date (like February 30 or April 31), the Date object will adjust the day to a valid date
        // We can check for adjustments as a way to ensure the dates submitted are real dates
        if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
            return vscode_1.l10n.t('Value must be a real date (mm/dd/yyyy)');
        }
        return undefined;
    }
    getTodaysDateFormatted() {
        const now = new Date();
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const dd = String(now.getDate()).padStart(2, '0');
        const yyyy = now.getFullYear();
        return `${mm}/${dd}/${yyyy}`;
    }
    async subWizard(context) {
        if (context.snapDate) {
            const response = await (0, getSnapshots_1.getMostRecentSnapshotByDate)(context.token, context.snapDate);
            context.mostRecentSnapshot = response.data?.snapshots?.[0];
        }
        return {
            promptSteps: [
                new BenchmarkListStep_1.BenchmarkListStep({ recommendedId: context.mostRecentSnapshot?.benchmark_id }),
                new SnapshotRebalanceThresholdStep_1.SnapshotRebalanceThresholdStep({ defaultThresholdPct: context.mostRecentSnapshot?.rebalance_threshold_pct }),
            ],
        };
    }
}
exports.SnapshotDateStep = SnapshotDateStep;


/***/ }),
/* 116 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.BenchmarkListStep = void 0;
const vscode_1 = __webpack_require__(1);
const PromptStep_1 = __webpack_require__(69);
const textUtils_1 = __webpack_require__(15);
const BenchmarksItem_1 = __webpack_require__(24);
class BenchmarkListStep extends PromptStep_1.PromptStep {
    options;
    constructor(options) {
        super();
        this.options = options;
    }
    async prompt(context) {
        context.benchmarkId = (await context.ui.showQuickPick(await this.getPicks(context), {
            title: this.title,
            placeHolder: vscode_1.l10n.t('Select a target benchmark'),
        }))?.data;
    }
    shouldPrompt(context) {
        return !context.benchmarkId;
    }
    async getPicks(context) {
        const benchmarks = await BenchmarksItem_1.BenchmarksItem.getBenchmarksWithCache(context.email);
        if (!benchmarks.length) {
            throw new Error(vscode_1.l10n.t('No benchmarks found, create a benchmark first to proceed'));
        }
        const picks = benchmarks.map(benchmark => {
            const isDefault = this.options?.recommendedId === benchmark.benchmark_id;
            return {
                label: benchmark.name,
                description: isDefault ? vscode_1.l10n.t('(recommended)') : undefined,
                detail: benchmark.asset_allocation.map(a => `${(0, textUtils_1.capitalize)(a.category)} - ${a.percent}%`).join(', '),
                data: benchmark.benchmark_id,
            };
        });
        if (!this.options?.suppressSkip) {
            picks.push({
                label: vscode_1.l10n.t('Skip for now'),
                data: undefined,
            });
        }
        return picks;
    }
}
exports.BenchmarkListStep = BenchmarkListStep;


/***/ }),
/* 117 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotRebalanceThresholdStep = void 0;
const vscode_1 = __webpack_require__(1);
const PromptStep_1 = __webpack_require__(69);
const validationUtils_1 = __webpack_require__(70);
const getBenchmark_1 = __webpack_require__(118);
class SnapshotRebalanceThresholdStep extends PromptStep_1.PromptStep {
    options;
    constructor(options = {}) {
        super();
        this.options = options;
    }
    async prompt(context) {
        let defaultThresholdPct = this.options.defaultThresholdPct;
        if (!defaultThresholdPct && context.benchmarkId) {
            const response = await (0, getBenchmark_1.getBenchmark)(context.token, context.benchmarkId);
            defaultThresholdPct = response.data?.benchmark?.rec_rebalance_threshold_pct;
        }
        context.rebalanceThresholdPct = Number((await context.ui.showInputBox({
            title: this.title,
            prompt: vscode_1.l10n.t('Enter the snapshot\'s rebalance threshold (%)'),
            value: defaultThresholdPct?.toString(),
            validateInput: this.validateInput,
        })));
    }
    shouldPrompt(context) {
        return !context.rebalanceThresholdPct;
    }
    validateInput(value) {
        if (!validationUtils_1.validationUtils.hasValidCharLength(value)) {
            return validationUtils_1.validationUtils.getInvalidCharLengthMessage();
        }
        const num = Number(value);
        if (isNaN(num) || !Number.isInteger(num)) {
            return vscode_1.l10n.t('Value must be a whole number.');
        }
        if (num < 1 || num > 99) {
            return vscode_1.l10n.t('Value must be between 1 and 99.');
        }
        return undefined;
    }
}
exports.SnapshotRebalanceThresholdStep = SnapshotRebalanceThresholdStep;


/***/ }),
/* 118 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getBenchmark = getBenchmark;
const constants_1 = __webpack_require__(7);
const settingUtils_1 = __webpack_require__(11);
async function getBenchmark(token, benchmarkId) {
    const response = await fetch(`${settingUtils_1.settingUtils.getApiEndpointBaseUrl()}/api/${constants_1.latestApiVersion}/benchmarks/${benchmarkId}`, {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return await response.json();
}


/***/ }),
/* 119 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotDescriptionStep = void 0;
const vscode_1 = __webpack_require__(1);
const PromptStep_1 = __webpack_require__(69);
const validationUtils_1 = __webpack_require__(70);
class SnapshotDescriptionStep extends PromptStep_1.PromptStep {
    async prompt(context) {
        context.snapDescription = (await context.ui.showInputBox({
            title: this.title,
            prompt: vscode_1.l10n.t('Enter a snapshot description'),
            validateInput: this.validateInput,
        }))?.trim();
    }
    shouldPrompt(context) {
        return !context.snapDescription;
    }
    validateInput(value) {
        value = value.trim();
        if (!value) {
            return undefined;
        }
        const tc = {
            upperLimitIncl: 1024,
        };
        if (!validationUtils_1.validationUtils.hasValidCharLength(value, tc)) {
            return validationUtils_1.validationUtils.getInvalidCharLengthMessage(tc);
        }
        return undefined;
    }
}
exports.SnapshotDescriptionStep = SnapshotDescriptionStep;


/***/ }),
/* 120 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotDraftCreateStep = void 0;
const ExecuteStep_1 = __webpack_require__(104);
const extensionVariables_1 = __webpack_require__(2);
const nonNull_1 = __webpack_require__(12);
const getSnapshot_1 = __webpack_require__(33);
const reorder_1 = __webpack_require__(17);
class SnapshotDraftCreateStep extends ExecuteStep_1.ExecuteStep {
    parentItem;
    priority;
    constructor(parentItem) {
        super();
        this.parentItem = parentItem;
    }
    async execute(context, progress) {
        progress.report({ message: "Creating snapshot draft..." });
        const snapDate = (0, nonNull_1.nonNullProp)(context, 'snapDate');
        const snapshot = context.mostRecentSnapshot;
        const snapshotValues = snapshot ? ((await (0, getSnapshot_1.getSnapshot)(context.token, snapshot.snap_id)).data?.snapshot_values ?? []) : [];
        extensionVariables_1.ext.snapshotDraftFileSystem.createSnapshotDraft(this.parentItem, {
            snap_date: snapDate,
            description: context.snapDescription,
            benchmark_id: context.benchmarkId,
            rebalance_threshold_pct: context.rebalanceThresholdPct,
        }, this.convertToPayloadValues(context, snapshot?.snap_id ?? 0, snapshotValues));
    }
    shouldExecute(context) {
        return !extensionVariables_1.ext.snapshotDraftFileSystem.hasSnapshotDraft(context.email);
    }
    /**
     * We only need to carry over the values that are required for creating new snapshot values.
     * Other metadata will look confusing when shown in the draft format since it is not used for creating new resources.
     *
     * Uses server-side value_order from the snapshot if available.
     */
    convertToPayloadValues(context, snapshotId, snapshotValues) {
        if (!snapshotId || !snapshotValues.length) {
            return snapshotValues;
        }
        // Get the snapshot to access server-side value_order
        const snapshot = context.mostRecentSnapshot;
        const snapshotValueResourceModels = snapshotValues.map(sv => (0, reorder_1.convertToGenericPiResourceModel)(sv, 'snap_val_id'));
        // Use server-side value_order if available, otherwise use default order
        let orderedSnapshotValues;
        if (snapshot?.value_order && snapshot.value_order.length > 0) {
            const orderedResourceIds = snapshot.value_order.map(id => String(id));
            orderedSnapshotValues = (0, reorder_1.orderResourcesByTargetIds)(snapshotValueResourceModels, orderedResourceIds);
        }
        else {
            orderedSnapshotValues = snapshotValueResourceModels;
        }
        const simplifiedPayloads = [];
        for (const sv of orderedSnapshotValues) {
            simplifiedPayloads.push({
                account_id: sv.account_id,
                holding_id: sv.holding_id,
                total: sv.total,
                skip_rebalance: sv.skip_rebalance,
            });
        }
        return simplifiedPayloads;
    }
}
exports.SnapshotDraftCreateStep = SnapshotDraftCreateStep;


/***/ }),
/* 121 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deploySnapshotDraft = deploySnapshotDraft;
const vscode_1 = __webpack_require__(1);
const SnapshotDraftDeployConfirmStep_1 = __webpack_require__(122);
const SnapshotDraftDeployStep_1 = __webpack_require__(123);
const extensionVariables_1 = __webpack_require__(2);
const nonNull_1 = __webpack_require__(12);
const tokenUtils_1 = __webpack_require__(6);
const Wizard_1 = __webpack_require__(67);
async function deploySnapshotDraft(context, item) {
    if (!extensionVariables_1.ext.snapshotDraftFileSystem.hasSnapshotDraft(item.email)) {
        throw new Error(vscode_1.l10n.t('A snapshot draft must be active to deploy.'));
    }
    const wizardContext = {
        ...context,
        email: item.email,
        token: (0, nonNull_1.nonNullValue)(await (0, tokenUtils_1.getAuthToken)(item.email)),
        snapshotPayload: (0, nonNull_1.nonNullValue)(extensionVariables_1.ext.snapshotDraftFileSystem.parseSnapshotDraft(item.email)),
    };
    const wizard = new Wizard_1.Wizard(wizardContext, {
        title: vscode_1.l10n.t('Deploy snapshot'),
        promptSteps: [
            new SnapshotDraftDeployConfirmStep_1.SnapshotDraftDeployConfirmStep(),
        ],
        executeSteps: [
            new SnapshotDraftDeployStep_1.SnapshotDraftDeployStep(),
        ],
    });
    await wizard.prompt();
    await wizard.execute();
    void context.ui.showInformationMessage(vscode_1.l10n.t('Created snapshot dated "{0}"', (0, nonNull_1.nonNullValueAndProp)(wizardContext.snapshot, 'snap_date')));
    extensionVariables_1.ext.snapshotDraftFileSystem.discardSnapshotDraft(item);
}


/***/ }),
/* 122 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotDraftDeployConfirmStep = void 0;
const vscode_1 = __webpack_require__(1);
const PromptStep_1 = __webpack_require__(69);
class SnapshotDraftDeployConfirmStep extends PromptStep_1.PromptStep {
    async prompt(context) {
        const warning = vscode_1.l10n.t('Deploy snapshot draft dated "{0}"?', context.snapshotPayload.snap_date);
        await context.ui.showWarningMessage(warning, { modal: true }, vscode_1.l10n.t('Confirm'));
    }
    shouldPrompt() {
        return true;
    }
}
exports.SnapshotDraftDeployConfirmStep = SnapshotDraftDeployConfirmStep;


/***/ }),
/* 123 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotDraftDeployStep = void 0;
const createSnapshot_1 = __webpack_require__(124);
const ExecuteStep_1 = __webpack_require__(104);
class SnapshotDraftDeployStep extends ExecuteStep_1.ExecuteStep {
    priority;
    async execute(context, progress) {
        progress.report({ message: "Creating snapshot..." });
        const response = await (0, createSnapshot_1.createSnapshot)(context.token, {
            snap_date: context.snapshotPayload.snap_date,
            description: context.snapshotPayload.description,
            benchmark_id: context.snapshotPayload.benchmark_id,
            rebalance_threshold_pct: context.snapshotPayload.rebalance_threshold_pct,
            snapshot_values: context.snapshotPayload.snapshot_values,
        });
        if (response.error) {
            throw new Error(response.error);
        }
        context.snapshot = response.data?.snapshot;
        context.snapshotValues = response.data?.snapshot_values;
    }
    shouldExecute(context) {
        return !context.snapshot;
    }
}
exports.SnapshotDraftDeployStep = SnapshotDraftDeployStep;


/***/ }),
/* 124 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createSnapshot = createSnapshot;
const constants_1 = __webpack_require__(7);
const settingUtils_1 = __webpack_require__(11);
async function createSnapshot(token, payload) {
    const response = await fetch(`${settingUtils_1.settingUtils.getApiEndpointBaseUrl()}/api/${constants_1.latestApiVersion}/snapshots`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });
    return await response.json();
}


/***/ }),
/* 125 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.discardSnapshotDraft = discardSnapshotDraft;
const extensionVariables_1 = __webpack_require__(2);
async function discardSnapshotDraft(_, item) {
    extensionVariables_1.ext.snapshotDraftFileSystem.discardSnapshotDraft(item);
}


/***/ }),
/* 126 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.editSnapshotDraft = editSnapshotDraft;
const extensionVariables_1 = __webpack_require__(2);
async function editSnapshotDraft(_, item) {
    extensionVariables_1.ext.snapshotDraftFileSystem.editSnapshotDraft(item);
}


/***/ }),
/* 127 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateSnapshotDraft = updateSnapshotDraft;
const vscode_1 = __webpack_require__(1);
const SnapshotDraftUpdateStep_1 = __webpack_require__(128);
const tokenUtils_1 = __webpack_require__(6);
const nonNull_1 = __webpack_require__(12);
const SnapshotDateStep_1 = __webpack_require__(115);
const SnapshotDescriptionStep_1 = __webpack_require__(119);
const BenchmarkListStep_1 = __webpack_require__(116);
const Wizard_1 = __webpack_require__(67);
const extensionVariables_1 = __webpack_require__(2);
const SnapshotRebalanceThresholdStep_1 = __webpack_require__(117);
const SnapshotDataItem_1 = __webpack_require__(31);
async function updateSnapshotDraft(context, item) {
    const wizardContext = {
        ...context,
        email: item.email,
        token: (0, nonNull_1.nonNullValue)(await (0, tokenUtils_1.getAuthToken)(item.email)),
        snapDate: item.key === SnapshotDataItem_1.snapshotDateKey ? undefined : item.snapshotData.snap_date,
        snapDescription: item.key === SnapshotDataItem_1.snapshotDescriptionKey ? undefined : item.snapshotData.description,
        benchmarkId: item.key === SnapshotDataItem_1.snapshotBenchmarkKey ? undefined : item.snapshotData.benchmark_id,
        rebalanceThresholdPct: item.key === SnapshotDataItem_1.snapshotRebalanceThresholdKey ? undefined : item.snapshotData.rebalance_threshold_pct,
        snapshotData: item.snapshotData,
    };
    const promptSteps = [];
    switch (item.key) {
        case SnapshotDataItem_1.snapshotDateKey:
            promptSteps.push(new SnapshotDateStep_1.SnapshotDateStep({ defaultDate: item.snapshotData.snap_date }));
            break;
        case SnapshotDataItem_1.snapshotDescriptionKey:
            promptSteps.push(new SnapshotDescriptionStep_1.SnapshotDescriptionStep());
            break;
        case SnapshotDataItem_1.snapshotBenchmarkKey:
            promptSteps.push(new BenchmarkListStep_1.BenchmarkListStep({ suppressSkip: true }));
            break;
        case SnapshotDataItem_1.snapshotRebalanceThresholdKey:
            promptSteps.push(new SnapshotRebalanceThresholdStep_1.SnapshotRebalanceThresholdStep({ defaultThresholdPct: item.snapshotData.rebalance_threshold_pct }));
            break;
        default:
    }
    const wizard = new Wizard_1.Wizard(wizardContext, {
        title: vscode_1.l10n.t('Update snapshot draft'),
        promptSteps,
        executeSteps: [
            new SnapshotDraftUpdateStep_1.SnapshotDraftUpdateStep(item.parent),
        ],
    });
    await wizard.prompt();
    await wizard.execute();
    void context.ui.showInformationMessage(vscode_1.l10n.t('Updated snapshot draft.'));
    extensionVariables_1.ext.portfolioInstrumentsTdp.refresh(item.parent);
}


/***/ }),
/* 128 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotDraftUpdateStep = void 0;
const vscode_1 = __webpack_require__(1);
const extensionVariables_1 = __webpack_require__(2);
const nonNull_1 = __webpack_require__(12);
class SnapshotDraftUpdateStep {
    item;
    priority;
    constructor(item) {
        this.item = item;
    }
    async execute(context, progress) {
        progress.report({ message: vscode_1.l10n.t("Updating snapshot draft...") });
        extensionVariables_1.ext.snapshotDraftFileSystem.updateSnapshotDraft(this.item, {
            snap_date: (0, nonNull_1.nonNullProp)(context, 'snapDate'),
            description: context.snapDescription,
            benchmark_id: context.benchmarkId,
            rebalance_threshold_pct: context.rebalanceThresholdPct,
        });
    }
    shouldExecute() {
        return true;
    }
}
exports.SnapshotDraftUpdateStep = SnapshotDraftUpdateStep;


/***/ }),
/* 129 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createSnapshotValueDraft = createSnapshotValueDraft;
const vscode_1 = __webpack_require__(1);
const tokenUtils_1 = __webpack_require__(6);
const nonNull_1 = __webpack_require__(12);
const Wizard_1 = __webpack_require__(67);
const AccountListStep_1 = __webpack_require__(130);
const HoldingListStep_1 = __webpack_require__(131);
const SnapshotValueTotalStep_1 = __webpack_require__(132);
const SnapshotValueSkipRebalanceStep_1 = __webpack_require__(133);
const extensionVariables_1 = __webpack_require__(2);
const SnapshotValueDraftCreateStep_1 = __webpack_require__(134);
async function createSnapshotValueDraft(context, item) {
    const wizardContext = {
        ...context,
        email: item.email,
        token: (0, nonNull_1.nonNullValue)(await (0, tokenUtils_1.getAuthToken)(item.email)),
    };
    const wizard = new Wizard_1.Wizard(wizardContext, {
        title: vscode_1.l10n.t('Create snapshot value (draft)'),
        promptSteps: [
            new AccountListStep_1.AccountListStep(),
            new HoldingListStep_1.HoldingListStep(),
            new SnapshotValueTotalStep_1.SnapshotValueTotalStep(),
            new SnapshotValueSkipRebalanceStep_1.SnapshotValueSkipRebalanceStep(),
        ],
        executeSteps: [
            new SnapshotValueDraftCreateStep_1.SnapshotValueDraftCreateStep(item.parent),
        ],
    });
    await wizard.prompt();
    await wizard.execute();
    void context.ui.showInformationMessage(vscode_1.l10n.t('Created new snapshot value draft with total "{0}".', (0, nonNull_1.nonNullProp)(wizardContext, 'total')));
    extensionVariables_1.ext.portfolioInstrumentsTdp.refresh(item.parent);
}


/***/ }),
/* 130 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.AccountListStep = void 0;
const vscode_1 = __webpack_require__(1);
const PromptStep_1 = __webpack_require__(69);
const AccountsItem_1 = __webpack_require__(9);
class AccountListStep extends PromptStep_1.PromptStep {
    options;
    constructor(options) {
        super();
        this.options = options;
    }
    async prompt(context) {
        context.accountId = (await context.ui.showQuickPick(await this.getPicks(context), {
            title: this.title,
            placeHolder: vscode_1.l10n.t('Select a target account'),
        }))?.data;
    }
    shouldPrompt(context) {
        return !context.accountId;
    }
    async getPicks(context) {
        const accounts = await AccountsItem_1.AccountsItem.getAccountsWithCache(context.email);
        if (!accounts.length) {
            throw new Error(vscode_1.l10n.t('No accounts found, create an account first to proceed'));
        }
        return accounts.map(account => {
            return {
                label: account.name,
                description: this.getDescription(account.account_id, `${account.institution}-${account.tax_shelter}`),
                detail: account.description,
                data: account.account_id,
            };
        });
    }
    getDescription(accountId, descriptionBase) {
        return accountId === this.options?.currentId ? `${descriptionBase} (current)` : descriptionBase;
    }
}
exports.AccountListStep = AccountListStep;


/***/ }),
/* 131 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HoldingListStep = void 0;
const vscode_1 = __webpack_require__(1);
const PromptStep_1 = __webpack_require__(69);
const HoldingsItem_1 = __webpack_require__(20);
class HoldingListStep extends PromptStep_1.PromptStep {
    options;
    constructor(options) {
        super();
        this.options = options;
    }
    async prompt(context) {
        context.holdingId = (await context.ui.showQuickPick(await this.getPicks(context), {
            title: this.title,
            placeHolder: vscode_1.l10n.t('Select a target holding'),
        }))?.data;
    }
    shouldPrompt(context) {
        return !context.holdingId;
    }
    async getPicks(context) {
        const holdings = await HoldingsItem_1.HoldingsItem.getHoldingsWithCache(context.email);
        if (!holdings.length) {
            throw new Error(vscode_1.l10n.t('No holdings found, create a holding first to proceed'));
        }
        return holdings.map(holding => {
            return {
                label: holding.name,
                description: this.getDescription(holding.holding_id, holding.asset_category),
                data: holding.holding_id,
            };
        });
    }
    getDescription(holdingId, descriptionBase) {
        return holdingId === this.options?.currentId ? `${descriptionBase} (current)` : descriptionBase;
    }
}
exports.HoldingListStep = HoldingListStep;


/***/ }),
/* 132 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotValueTotalStep = void 0;
const vscode_1 = __webpack_require__(1);
const PromptStep_1 = __webpack_require__(69);
const validationUtils_1 = __webpack_require__(70);
class SnapshotValueTotalStep extends PromptStep_1.PromptStep {
    options;
    constructor(options) {
        super();
        this.options = options;
    }
    async prompt(context) {
        context.total = Number((await context.ui.showInputBox({
            title: this.title,
            value: this.options?.defaultValue?.toString() ?? context.snapshotValue?.total.toString(),
            prompt: vscode_1.l10n.t('Enter a snapshot value amount ($)'),
            validateInput: this.validateInput,
        }))?.trim().replace(/,/g, ''));
    }
    shouldPrompt(context) {
        return !context.total;
    }
    validateInput(value) {
        value = value.trim();
        value = value.replace(/,/g, '');
        if (!validationUtils_1.validationUtils.hasValidCharLength(value)) {
            return validationUtils_1.validationUtils.getInvalidCharLengthMessage();
        }
        const pattern = /^(-)?\d+(\.\d{2})?$/;
        if (!pattern.test(value)) {
            return vscode_1.l10n.t('Please enter a valid dollar value amount (e.g. 10.25).');
        }
        return undefined;
    }
}
exports.SnapshotValueTotalStep = SnapshotValueTotalStep;


/***/ }),
/* 133 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotValueSkipRebalanceStep = void 0;
const vscode_1 = __webpack_require__(1);
const PromptStep_1 = __webpack_require__(69);
class SnapshotValueSkipRebalanceStep extends PromptStep_1.PromptStep {
    async prompt(context) {
        const items = [
            {
                label: vscode_1.l10n.t('Yes'),
                description: context.snapshotValue?.skip_rebalance === false ? vscode_1.l10n.t('(current)') : vscode_1.l10n.t('(recommended)'),
                data: false,
            },
            {
                label: vscode_1.l10n.t('No'),
                description: context.snapshotValue?.skip_rebalance === true ? vscode_1.l10n.t('(current)') : undefined,
                data: true,
            },
        ];
        context.skipRebalance = (await context.ui.showQuickPick(items, {
            title: this.title,
            placeHolder: vscode_1.l10n.t('Include in rebalance calculations?'),
        }))?.data;
    }
    shouldPrompt(context) {
        return context.skipRebalance === undefined;
    }
}
exports.SnapshotValueSkipRebalanceStep = SnapshotValueSkipRebalanceStep;


/***/ }),
/* 134 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotValueDraftCreateStep = void 0;
const vscode_1 = __webpack_require__(1);
const extensionVariables_1 = __webpack_require__(2);
const nonNull_1 = __webpack_require__(12);
class SnapshotValueDraftCreateStep {
    item;
    priority;
    constructor(item) {
        this.item = item;
    }
    async execute(context, progress) {
        progress.report({ message: vscode_1.l10n.t("Creating snapshot value (draft)...") });
        const snapshotDraft = extensionVariables_1.ext.snapshotDraftFileSystem.parseSnapshotDraft(this.item.email);
        const snapshotValues = snapshotDraft?.snapshot_values ?? [];
        snapshotValues.push({
            account_id: (0, nonNull_1.nonNullProp)(context, 'accountId'),
            holding_id: (0, nonNull_1.nonNullProp)(context, 'holdingId'),
            total: (0, nonNull_1.nonNullProp)(context, 'total'),
            skip_rebalance: context.skipRebalance,
        });
        await extensionVariables_1.ext.snapshotDraftFileSystem.updateSnapshotValuesDraft(this.item, snapshotValues);
    }
    shouldExecute() {
        return true;
    }
}
exports.SnapshotValueDraftCreateStep = SnapshotValueDraftCreateStep;


/***/ }),
/* 135 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deleteSnapshotValueDraft = deleteSnapshotValueDraft;
const vscode_1 = __webpack_require__(1);
const tokenUtils_1 = __webpack_require__(6);
const nonNull_1 = __webpack_require__(12);
const Wizard_1 = __webpack_require__(67);
const SnapshotValueDeleteConfirmStep_1 = __webpack_require__(136);
const SnapshotValueDraftDeleteStep_1 = __webpack_require__(137);
const extensionVariables_1 = __webpack_require__(2);
async function deleteSnapshotValueDraft(context, item) {
    const wizardContext = {
        ...context,
        email: item.email,
        token: (0, nonNull_1.nonNullValue)(await (0, tokenUtils_1.getAuthToken)(item.email)),
        svIdx: item.svIdx,
        snapshotValueDraft: item.snapshotValue,
    };
    const wizard = new Wizard_1.Wizard(wizardContext, {
        title: vscode_1.l10n.t('Delete a snapshot value (draft)'),
        promptSteps: [
            new SnapshotValueDeleteConfirmStep_1.SnapshotValueDeleteConfirmStep(),
        ],
        executeSteps: [
            new SnapshotValueDraftDeleteStep_1.SnapshotValueDraftDeleteStep(item.grandParent),
        ],
    });
    await wizard.prompt();
    await wizard.execute();
    void context.ui.showInformationMessage(vscode_1.l10n.t('Deleted snapshot value with total "{0}" (draft)', (0, nonNull_1.nonNullValueAndProp)(wizardContext.snapshotValueDraft, 'total')));
    extensionVariables_1.ext.portfolioInstrumentsTdp.refresh(item.parent);
}


/***/ }),
/* 136 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotValueDeleteConfirmStep = void 0;
const vscode_1 = __webpack_require__(1);
const PromptStep_1 = __webpack_require__(69);
class SnapshotValueDeleteConfirmStep extends PromptStep_1.PromptStep {
    async prompt(context) {
        const warning = vscode_1.l10n.t('Are you sure you want to delete snapshot value with total "{0}" (draft)?', context.snapshotValueDraft.total);
        await context.ui.showWarningMessage(warning, { modal: true }, vscode_1.l10n.t('Confirm'));
    }
    shouldPrompt() {
        return true;
    }
}
exports.SnapshotValueDeleteConfirmStep = SnapshotValueDeleteConfirmStep;


/***/ }),
/* 137 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotValueDraftDeleteStep = void 0;
const vscode_1 = __webpack_require__(1);
const extensionVariables_1 = __webpack_require__(2);
class SnapshotValueDraftDeleteStep {
    item;
    priority;
    constructor(item) {
        this.item = item;
    }
    async execute(context, progress) {
        progress.report({ message: vscode_1.l10n.t("Deleting snapshot value (draft)...") });
        const snapshotDraft = extensionVariables_1.ext.snapshotDraftFileSystem.parseSnapshotDraft(this.item.email);
        let snapshotValues = snapshotDraft?.snapshot_values ?? [];
        snapshotValues = snapshotValues.filter((_, idx) => idx !== context.svIdx);
        await extensionVariables_1.ext.snapshotDraftFileSystem.updateSnapshotValuesDraft(this.item, snapshotValues);
    }
    shouldExecute(context) {
        return !!context.snapshotValueDraft && context.svIdx !== undefined;
    }
}
exports.SnapshotValueDraftDeleteStep = SnapshotValueDraftDeleteStep;


/***/ }),
/* 138 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateSnapshotValueAmountDraft = updateSnapshotValueAmountDraft;
const vscode_1 = __webpack_require__(1);
const tokenUtils_1 = __webpack_require__(6);
const nonNull_1 = __webpack_require__(12);
const Wizard_1 = __webpack_require__(67);
const extensionVariables_1 = __webpack_require__(2);
const SnapshotValueDraftUpdateStep_1 = __webpack_require__(139);
const SnapshotValueTotalStep_1 = __webpack_require__(132);
async function updateSnapshotValueAmountDraft(context, item) {
    const wizardContext = {
        ...context,
        email: item.email,
        token: (0, nonNull_1.nonNullValue)(await (0, tokenUtils_1.getAuthToken)(item.email)),
        svIdx: item.svIdx,
        accountId: item.snapshotValue.account_id,
        holdingId: item.snapshotValue.holding_id,
        skipRebalance: item.snapshotValue.skip_rebalance,
        snapshotValueDraft: item.snapshotValue,
    };
    const wizard = new Wizard_1.Wizard(wizardContext, {
        title: vscode_1.l10n.t('Update snapshot value (draft)'),
        promptSteps: [
            new SnapshotValueTotalStep_1.SnapshotValueTotalStep({ defaultValue: wizardContext.snapshotValueDraft.total }),
        ],
        executeSteps: [
            new SnapshotValueDraftUpdateStep_1.SnapshotValueDraftUpdateStep(item.grandParent),
        ],
    });
    await wizard.prompt();
    await wizard.execute();
    void context.ui.showInformationMessage(vscode_1.l10n.t('Deleted snapshot value with total "{0}" (draft)', (0, nonNull_1.nonNullValueAndProp)(wizardContext.snapshotValueDraft, 'total')));
    extensionVariables_1.ext.portfolioInstrumentsTdp.refresh(item.parent);
}


/***/ }),
/* 139 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotValueDraftUpdateStep = void 0;
const vscode_1 = __webpack_require__(1);
const extensionVariables_1 = __webpack_require__(2);
const nonNull_1 = __webpack_require__(12);
class SnapshotValueDraftUpdateStep {
    item;
    priority;
    constructor(item) {
        this.item = item;
    }
    async execute(context, progress) {
        progress.report({ message: vscode_1.l10n.t("Updating snapshot value (draft)...") });
        const snapshotDraft = extensionVariables_1.ext.snapshotDraftFileSystem.parseSnapshotDraft(this.item.email);
        let snapshotValues = snapshotDraft?.snapshot_values ?? [];
        snapshotValues[context.svIdx] = {
            account_id: (0, nonNull_1.nonNullProp)(context, 'accountId'),
            holding_id: (0, nonNull_1.nonNullProp)(context, 'holdingId'),
            total: (0, nonNull_1.nonNullProp)(context, 'total'),
            skip_rebalance: context.skipRebalance,
        };
        await extensionVariables_1.ext.snapshotDraftFileSystem.updateSnapshotValuesDraft(this.item, snapshotValues);
    }
    shouldExecute(context) {
        return !!context.snapshotValueDraft && context.svIdx !== undefined;
    }
}
exports.SnapshotValueDraftUpdateStep = SnapshotValueDraftUpdateStep;


/***/ }),
/* 140 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateSnapshotValueDraft = updateSnapshotValueDraft;
const vscode_1 = __webpack_require__(1);
const tokenUtils_1 = __webpack_require__(6);
const nonNull_1 = __webpack_require__(12);
const Wizard_1 = __webpack_require__(67);
const extensionVariables_1 = __webpack_require__(2);
const AccountListStep_1 = __webpack_require__(130);
const HoldingListStep_1 = __webpack_require__(131);
const SnapshotValueDraftUpdateStep_1 = __webpack_require__(139);
const SnapshotValueTotalStep_1 = __webpack_require__(132);
const SnapshotValueSkipRebalanceStep_1 = __webpack_require__(133);
async function updateSnapshotValueDraft(context, item) {
    const wizardContext = {
        ...context,
        email: item.email,
        token: (0, nonNull_1.nonNullValue)(await (0, tokenUtils_1.getAuthToken)(item.email)),
        svIdx: item.svIdx,
        snapshotValueDraft: item.snapshotValue,
    };
    const wizard = new Wizard_1.Wizard(wizardContext, {
        title: vscode_1.l10n.t('Update snapshot value (draft)'),
        promptSteps: [
            new AccountListStep_1.AccountListStep({ currentId: wizardContext.snapshotValueDraft.account_id }),
            new HoldingListStep_1.HoldingListStep({ currentId: wizardContext.snapshotValueDraft.holding_id }),
            new SnapshotValueTotalStep_1.SnapshotValueTotalStep({ defaultValue: wizardContext.snapshotValueDraft.total }),
            new SnapshotValueSkipRebalanceStep_1.SnapshotValueSkipRebalanceStep(),
        ],
        executeSteps: [
            new SnapshotValueDraftUpdateStep_1.SnapshotValueDraftUpdateStep(item.grandParent),
        ],
    });
    await wizard.prompt();
    await wizard.execute();
    void context.ui.showInformationMessage(vscode_1.l10n.t('Deleted snapshot value with total "{0}" (draft)', (0, nonNull_1.nonNullValueAndProp)(wizardContext.snapshotValueDraft, 'total')));
    extensionVariables_1.ext.portfolioInstrumentsTdp.refresh(item.parent);
}


/***/ }),
/* 141 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createHolding = createHolding;
const vscode_1 = __webpack_require__(1);
const nonNull_1 = __webpack_require__(12);
const tokenUtils_1 = __webpack_require__(6);
const Wizard_1 = __webpack_require__(67);
const HoldingsItem_1 = __webpack_require__(20);
const HoldingNameStep_1 = __webpack_require__(142);
const HoldingTypeListStep_1 = __webpack_require__(143);
const HoldingAssetCategoryStep_1 = __webpack_require__(148);
const HoldingCreateStep_1 = __webpack_require__(149);
const extensionVariables_1 = __webpack_require__(2);
async function createHolding(context, item) {
    const wizardContext = {
        ...context,
        email: item.email,
        token: (0, nonNull_1.nonNullValue)(await (0, tokenUtils_1.getAuthToken)(item.email)),
    };
    const wizard = new Wizard_1.Wizard(wizardContext, {
        title: vscode_1.l10n.t('Create a financial holding'),
        promptSteps: [
            new HoldingNameStep_1.HoldingNameStep(),
            new HoldingAssetCategoryStep_1.HoldingAssetCategoryStep(),
            new HoldingTypeListStep_1.HoldingTypeListStep(),
        ],
        executeSteps: [
            new HoldingCreateStep_1.HoldingCreateStep(),
        ],
    });
    await wizard.prompt();
    await wizard.execute();
    void context.ui.showInformationMessage(vscode_1.l10n.t('Created holding "{0}"', (0, nonNull_1.nonNullValueAndProp)(wizardContext.holding, 'name')));
    extensionVariables_1.ext.resourceCache.delete(HoldingsItem_1.HoldingsItem.generatePiExtHoldingsId(item.email));
    extensionVariables_1.ext.portfolioInstrumentsTdp.refresh(item);
}


/***/ }),
/* 142 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HoldingNameStep = void 0;
const vscode_1 = __webpack_require__(1);
const PromptStep_1 = __webpack_require__(69);
const validationUtils_1 = __webpack_require__(70);
class HoldingNameStep extends PromptStep_1.PromptStep {
    async prompt(context) {
        context.holdingName = (await context.ui.showInputBox({
            title: this.title,
            value: context.holding?.name,
            prompt: vscode_1.l10n.t('Enter holding name'),
            validateInput: this.validateInput,
        }))?.trim();
    }
    shouldPrompt(context) {
        return !context.holdingName;
    }
    validateInput(value) {
        value = value.trim();
        const tc = {
            lowerLimitIncl: 1,
            upperLimitIncl: 256,
        };
        if (!validationUtils_1.validationUtils.hasValidCharLength(value, tc)) {
            return validationUtils_1.validationUtils.getInvalidCharLengthMessage(tc);
        }
        return undefined;
    }
}
exports.HoldingNameStep = HoldingNameStep;


/***/ }),
/* 143 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HoldingTypeListStep = exports.HoldingType = void 0;
const PromptStep_1 = __webpack_require__(69);
const vscode_1 = __webpack_require__(1);
const HoldingTickerStep_1 = __webpack_require__(144);
const HoldingMaturationDateStep_1 = __webpack_require__(145);
const HoldingExpenseRatioStep_1 = __webpack_require__(146);
const HoldingInterestRateStep_1 = __webpack_require__(147);
var HoldingType;
(function (HoldingType) {
    HoldingType["ListedSecurity"] = "ListedSecurity";
    HoldingType["UnlistedFixedIncome"] = "UnlistedFixedIncome";
    HoldingType["Other"] = "Other";
})(HoldingType || (exports.HoldingType = HoldingType = {}));
class HoldingTypeListStep extends PromptStep_1.PromptStep {
    async prompt(context) {
        const current = vscode_1.l10n.t('(current)');
        const items = [
            {
                label: vscode_1.l10n.t('Listed Securities'),
                description: context.holding?.ticker ? current : undefined,
                detail: vscode_1.l10n.t('Assets with tickers that are publicly traded on exchanges'),
                data: HoldingType.ListedSecurity,
            },
            {
                label: vscode_1.l10n.t('Unlisted Fixed Income'),
                description: context.holding?.interest_rate_pct || context.holding?.maturation_date ? current : undefined,
                detail: vscode_1.l10n.t('Fixed income assets like secondary market bonds and bills without tickers'),
                data: HoldingType.UnlistedFixedIncome,
            },
            {
                label: vscode_1.l10n.t('Other Investments'),
                description: !context.holding?.ticker && !context.holding?.interest_rate_pct && !context.holding?.maturation_date && context.holding ? current : undefined,
                detail: vscode_1.l10n.t('Assets that do not fall into the listed or unlisted categories'),
                data: HoldingType.Other,
            }
        ];
        context.holdingType = (await context.ui.showQuickPick(items, {
            title: this.title,
            placeHolder: vscode_1.l10n.t('Choose a holding type'),
        }))?.data;
    }
    shouldPrompt(context) {
        return !context.holdingType;
    }
    subWizard(context) {
        switch (context.holdingType) {
            case HoldingType.ListedSecurity:
                return {
                    promptSteps: [
                        new HoldingTickerStep_1.HoldingTickerStep(),
                        new HoldingExpenseRatioStep_1.HoldingExpenseRatioStep(),
                    ],
                };
            case HoldingType.UnlistedFixedIncome:
                return {
                    promptSteps: [
                        new HoldingInterestRateStep_1.HoldingInterestRateStep(),
                        new HoldingMaturationDateStep_1.HoldingMaturationDateStep(),
                    ],
                };
            case HoldingType.Other:
            default:
                return undefined;
        }
    }
}
exports.HoldingTypeListStep = HoldingTypeListStep;


/***/ }),
/* 144 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HoldingTickerStep = void 0;
const vscode_1 = __webpack_require__(1);
const PromptStep_1 = __webpack_require__(69);
const validationUtils_1 = __webpack_require__(70);
class HoldingTickerStep extends PromptStep_1.PromptStep {
    async prompt(context) {
        context.holdingTicker = (await context.ui.showInputBox({
            title: this.title,
            value: context.holding?.ticker,
            prompt: vscode_1.l10n.t('Enter holding ticker'),
            validateInput: this.validateInput,
        }))?.trim();
    }
    shouldPrompt(context) {
        return !context.holdingTicker;
    }
    validateInput(value) {
        value = value.trim();
        const tc = {
            lowerLimitIncl: 1,
            upperLimitIncl: 32,
        };
        if (!validationUtils_1.validationUtils.hasValidCharLength(value, tc)) {
            return validationUtils_1.validationUtils.getInvalidCharLengthMessage(tc);
        }
        return undefined;
    }
}
exports.HoldingTickerStep = HoldingTickerStep;


/***/ }),
/* 145 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HoldingMaturationDateStep = void 0;
const vscode_1 = __webpack_require__(1);
const PromptStep_1 = __webpack_require__(69);
const validationUtils_1 = __webpack_require__(70);
class HoldingMaturationDateStep extends PromptStep_1.PromptStep {
    async prompt(context) {
        context.holdingMaturationDate = (await context.ui.showInputBox({
            title: this.title,
            value: context.holding?.maturation_date,
            prompt: vscode_1.l10n.t('Enter holding maturation date (mm/dd/yyyy)'),
            validateInput: this.validateInput,
        }))?.trim();
    }
    shouldPrompt(context) {
        return !context.holdingMaturationDate;
    }
    validateInput(value) {
        value = value.trim();
        const tc = {
            lowerLimitIncl: 10,
            upperLimitIncl: 10,
        };
        if (!validationUtils_1.validationUtils.hasValidCharLength(value, tc)) {
            return validationUtils_1.validationUtils.getInvalidCharLengthMessage(tc);
        }
        const pattern = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!pattern.test(value)) {
            return vscode_1.l10n.t('Value must have the following format: mm/dd/yyyy');
        }
        const [month, day, year] = value.split('/').map(Number);
        const date = new Date(year, month - 1, day);
        // If the date is not a valid calendar date (like February 30 or April 31), the Date object will adjust the day to a valid date
        // We can check for adjustments as a way to ensure the dates submitted are real dates
        if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
            return vscode_1.l10n.t('Value must be a real date (mm/dd/yyyy)');
        }
        return undefined;
    }
}
exports.HoldingMaturationDateStep = HoldingMaturationDateStep;


/***/ }),
/* 146 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HoldingExpenseRatioStep = void 0;
const vscode_1 = __webpack_require__(1);
const PromptStep_1 = __webpack_require__(69);
const validationUtils_1 = __webpack_require__(70);
class HoldingExpenseRatioStep extends PromptStep_1.PromptStep {
    async prompt(context) {
        context.holdingExpenseRatioPct = Number((await context.ui.showInputBox({
            title: this.title,
            value: String(context.holding?.expense_ratio_pct ?? '') || undefined,
            prompt: vscode_1.l10n.t('Enter holding expense ratio (%)'),
            validateInput: this.validateInput,
        })));
    }
    shouldPrompt(context) {
        return !context.holdingExpenseRatioPct;
    }
    validateInput(value) {
        if (!validationUtils_1.validationUtils.hasValidCharLength(value)) {
            return validationUtils_1.validationUtils.getInvalidCharLengthMessage();
        }
        if (isNaN(Number(value))) {
            return vscode_1.l10n.t('Value must have a number format.');
        }
        const num = Number(value);
        if (num < 0 || num > 100) {
            return vscode_1.l10n.t('Value must be between 0 and 100.');
        }
        return undefined;
    }
}
exports.HoldingExpenseRatioStep = HoldingExpenseRatioStep;


/***/ }),
/* 147 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HoldingInterestRateStep = void 0;
const vscode_1 = __webpack_require__(1);
const PromptStep_1 = __webpack_require__(69);
const validationUtils_1 = __webpack_require__(70);
class HoldingInterestRateStep extends PromptStep_1.PromptStep {
    async prompt(context) {
        context.holdingInterestRatePct = Number((await context.ui.showInputBox({
            title: this.title,
            value: String(context.holding?.interest_rate_pct ?? '') || undefined,
            prompt: vscode_1.l10n.t('Enter holding interest rate (%)'),
            validateInput: this.validateInput,
        })));
    }
    shouldPrompt(context) {
        return !context.holdingInterestRatePct;
    }
    validateInput(value) {
        if (!validationUtils_1.validationUtils.hasValidCharLength(value)) {
            return validationUtils_1.validationUtils.getInvalidCharLengthMessage();
        }
        if (isNaN(Number(value))) {
            return vscode_1.l10n.t('Value must have a number format.');
        }
        const num = Number(value);
        if (num < 0 || num > 100) {
            return vscode_1.l10n.t('Value must be between 0 and 100.');
        }
        return undefined;
    }
}
exports.HoldingInterestRateStep = HoldingInterestRateStep;


/***/ }),
/* 148 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HoldingAssetCategoryStep = void 0;
const PromptStep_1 = __webpack_require__(69);
const vscode_1 = __webpack_require__(1);
const portfolio_instruments_api_1 = __webpack_require__(73);
class HoldingAssetCategoryStep extends PromptStep_1.PromptStep {
    async prompt(context) {
        context.holdingAssetCategory = (await context.ui.showQuickPick(this.getPicks(context), {
            title: this.title,
            placeHolder: vscode_1.l10n.t('Specify a holding category'),
        }))?.data;
    }
    shouldPrompt(context) {
        return !context.holdingAssetCategory;
    }
    getPicks(context) {
        const current = vscode_1.l10n.t("(current)");
        function isCurrent(assetCategory) {
            return context.holding?.asset_category === assetCategory;
        }
        return [
            { label: "Cash", description: `CASH${isCurrent(portfolio_instruments_api_1.AssetCategory.Cash) ? ` ${current}` : ""}`, data: portfolio_instruments_api_1.AssetCategory.Cash },
            { label: "Bills", description: `BILLS${isCurrent(portfolio_instruments_api_1.AssetCategory.Bills) ? ` ${current}` : ""}`, data: portfolio_instruments_api_1.AssetCategory.Bills },
            { label: "Short-Term Bonds", description: `STB${isCurrent(portfolio_instruments_api_1.AssetCategory.STB) ? ` ${current}` : ""}`, data: portfolio_instruments_api_1.AssetCategory.STB },
            { label: "Intermediate-Term Bonds", description: `ITB${isCurrent(portfolio_instruments_api_1.AssetCategory.ITB) ? ` ${current}` : ""}`, data: portfolio_instruments_api_1.AssetCategory.ITB },
            { label: "Long-Term Bonds", description: `LTB${isCurrent(portfolio_instruments_api_1.AssetCategory.LTB) ? ` ${current}` : ""}`, data: portfolio_instruments_api_1.AssetCategory.LTB },
            { label: "Total Stock Market", description: `TSM${isCurrent(portfolio_instruments_api_1.AssetCategory.TSM) ? ` ${current}` : ""}`, data: portfolio_instruments_api_1.AssetCategory.TSM },
            { label: "Domestic Large-Cap Blend", description: `DLCB${isCurrent(portfolio_instruments_api_1.AssetCategory.DLCB) ? ` ${current}` : ""}`, data: portfolio_instruments_api_1.AssetCategory.DLCB },
            { label: "Domestic Large-Cap Growth", description: `DLCG${isCurrent(portfolio_instruments_api_1.AssetCategory.DLCG) ? ` ${current}` : ""}`, data: portfolio_instruments_api_1.AssetCategory.DLCG },
            { label: "Domestic Large-Cap Value", description: `DLCV${isCurrent(portfolio_instruments_api_1.AssetCategory.DLCV) ? ` ${current}` : ""}`, data: portfolio_instruments_api_1.AssetCategory.DLCV },
            { label: "Domestic Large-Cap Momentum", description: `DLCM${isCurrent(portfolio_instruments_api_1.AssetCategory.DLCM) ? ` ${current}` : ""}`, data: portfolio_instruments_api_1.AssetCategory.DLCM },
            { label: "Domestic Mid-Cap Blend", description: `DMCB${isCurrent(portfolio_instruments_api_1.AssetCategory.DMCB) ? ` ${current}` : ""}`, data: portfolio_instruments_api_1.AssetCategory.DMCB },
            { label: "Domestic Mid-Cap Growth", description: `DMCG${isCurrent(portfolio_instruments_api_1.AssetCategory.DMCG) ? ` ${current}` : ""}`, data: portfolio_instruments_api_1.AssetCategory.DMCG },
            { label: "Domestic Mid-Cap Value", description: `DMCV${isCurrent(portfolio_instruments_api_1.AssetCategory.DMCV) ? ` ${current}` : ""}`, data: portfolio_instruments_api_1.AssetCategory.DMCV },
            { label: "Domestic Mid-Cap Momentum", description: `DMCM${isCurrent(portfolio_instruments_api_1.AssetCategory.DMCM) ? ` ${current}` : ""}`, data: portfolio_instruments_api_1.AssetCategory.DMCM },
            { label: "Domestic Small-Cap Growth", description: `DSCG${isCurrent(portfolio_instruments_api_1.AssetCategory.DSCG) ? ` ${current}` : ""}`, data: portfolio_instruments_api_1.AssetCategory.DSCG },
            { label: "Domestic Small-Cap Bonds", description: `DSCB${isCurrent(portfolio_instruments_api_1.AssetCategory.DSCB) ? ` ${current}` : ""}`, data: portfolio_instruments_api_1.AssetCategory.DSCB },
            { label: "Domestic Small-Cap Value", description: `DSCV${isCurrent(portfolio_instruments_api_1.AssetCategory.DSCV) ? ` ${current}` : ""}`, data: portfolio_instruments_api_1.AssetCategory.DSCV },
            { label: "Domestic Small-Cap Momentum", description: `DSCM${isCurrent(portfolio_instruments_api_1.AssetCategory.DSCM) ? ` ${current}` : ""}`, data: portfolio_instruments_api_1.AssetCategory.DSCM },
            { label: "International Large-Cap Blend", description: `ILCB${isCurrent(portfolio_instruments_api_1.AssetCategory.ILCB) ? ` ${current}` : ""}`, data: portfolio_instruments_api_1.AssetCategory.ILCB },
            { label: "International Large-Cap Growth", description: `ILCG${isCurrent(portfolio_instruments_api_1.AssetCategory.ILCG) ? ` ${current}` : ""}`, data: portfolio_instruments_api_1.AssetCategory.ILCG },
            { label: "International Large-Cap Value", description: `ILCV${isCurrent(portfolio_instruments_api_1.AssetCategory.ILCV) ? ` ${current}` : ""}`, data: portfolio_instruments_api_1.AssetCategory.ILCV },
            { label: "International Large-Cap Momentum", description: `ILCM${isCurrent(portfolio_instruments_api_1.AssetCategory.ILCM) ? ` ${current}` : ""}`, data: portfolio_instruments_api_1.AssetCategory.ILCM },
            { label: "International Mid-Cap Blend", description: `IMCB${isCurrent(portfolio_instruments_api_1.AssetCategory.IMCB) ? ` ${current}` : ""}`, data: portfolio_instruments_api_1.AssetCategory.IMCB },
            { label: "International Mid-Cap Growth", description: `IMCG${isCurrent(portfolio_instruments_api_1.AssetCategory.IMCG) ? ` ${current}` : ""}`, data: portfolio_instruments_api_1.AssetCategory.IMCG },
            { label: "International Mid-Cap Value", description: `IMCV${isCurrent(portfolio_instruments_api_1.AssetCategory.IMCV) ? ` ${current}` : ""}`, data: portfolio_instruments_api_1.AssetCategory.IMCV },
            { label: "International Mid-Cap Momentum", description: `IMCM${isCurrent(portfolio_instruments_api_1.AssetCategory.IMCM) ? ` ${current}` : ""}`, data: portfolio_instruments_api_1.AssetCategory.IMCM },
            { label: "International Small-Cap Blend", description: `ISCB${isCurrent(portfolio_instruments_api_1.AssetCategory.ISCB) ? ` ${current}` : ""}`, data: portfolio_instruments_api_1.AssetCategory.ISCB },
            { label: "International Small-Cap Growth", description: `ISCG${isCurrent(portfolio_instruments_api_1.AssetCategory.ISCG) ? ` ${current}` : ""}`, data: portfolio_instruments_api_1.AssetCategory.ISCG },
            { label: "International Small-Cap Value", description: `ISCV${isCurrent(portfolio_instruments_api_1.AssetCategory.ISCV) ? ` ${current}` : ""}`, data: portfolio_instruments_api_1.AssetCategory.ISCV },
            { label: "International Small-Cap Momentum", description: `ISCM${isCurrent(portfolio_instruments_api_1.AssetCategory.ISCM) ? ` ${current}` : ""}`, data: portfolio_instruments_api_1.AssetCategory.ISCM },
            { label: "Commodities", description: `COMMODITIES${isCurrent(portfolio_instruments_api_1.AssetCategory.Commodities) ? ` ${current}` : ""}`, data: portfolio_instruments_api_1.AssetCategory.Commodities },
            { label: "Gold", description: `GOLD${isCurrent(portfolio_instruments_api_1.AssetCategory.Gold) ? ` ${current}` : ""}`, data: portfolio_instruments_api_1.AssetCategory.Gold },
            { label: "Real-Estate Investment Trusts", description: `REITS${isCurrent(portfolio_instruments_api_1.AssetCategory.REITS) ? ` ${current}` : ""}`, data: portfolio_instruments_api_1.AssetCategory.REITS },
            { label: "Crypto Currency", description: `CRYPTO${isCurrent(portfolio_instruments_api_1.AssetCategory.Crypto) ? ` ${current}` : ""}`, data: portfolio_instruments_api_1.AssetCategory.Crypto },
            { label: "Other", description: `OTHER${isCurrent(portfolio_instruments_api_1.AssetCategory.Other) ? ` ${current}` : ""}`, data: portfolio_instruments_api_1.AssetCategory.Other },
        ];
    }
}
exports.HoldingAssetCategoryStep = HoldingAssetCategoryStep;


/***/ }),
/* 149 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HoldingCreateStep = void 0;
const createHolding_1 = __webpack_require__(150);
const nonNull_1 = __webpack_require__(12);
const ExecuteStep_1 = __webpack_require__(104);
class HoldingCreateStep extends ExecuteStep_1.ExecuteStep {
    priority;
    async execute(context, progress) {
        progress.report({ message: "Creating holding..." });
        const response = await (0, createHolding_1.createHolding)(context.token, {
            name: (0, nonNull_1.nonNullProp)(context, 'holdingName'),
            asset_category: (0, nonNull_1.nonNullProp)(context, 'holdingAssetCategory'),
            ticker: context.holdingTicker,
            expense_ratio_pct: context.holdingExpenseRatioPct,
            interest_rate_pct: context.holdingInterestRatePct,
            maturation_date: context.holdingMaturationDate,
            is_deprecated: false,
        });
        if (response.error) {
            throw new Error(response.error);
        }
        context.holding = response.data?.holding;
    }
    shouldExecute(context) {
        return !context.holding;
    }
}
exports.HoldingCreateStep = HoldingCreateStep;


/***/ }),
/* 150 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createHolding = createHolding;
const constants_1 = __webpack_require__(7);
const settingUtils_1 = __webpack_require__(11);
async function createHolding(token, payload) {
    const response = await fetch(`${settingUtils_1.settingUtils.getApiEndpointBaseUrl()}/api/${constants_1.latestApiVersion}/holdings`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });
    return await response.json();
}


/***/ }),
/* 151 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deleteHolding = deleteHolding;
const vscode_1 = __webpack_require__(1);
const nonNull_1 = __webpack_require__(12);
const tokenUtils_1 = __webpack_require__(6);
const Wizard_1 = __webpack_require__(67);
const extensionVariables_1 = __webpack_require__(2);
const HoldingDeleteConfirmStep_1 = __webpack_require__(152);
const HoldingDeleteStep_1 = __webpack_require__(153);
const HoldingsItem_1 = __webpack_require__(20);
async function deleteHolding(context, item) {
    const wizardContext = {
        ...context,
        email: item.email,
        token: (0, nonNull_1.nonNullValue)(await (0, tokenUtils_1.getAuthToken)(item.email)),
        holding: item.holding,
    };
    const wizard = new Wizard_1.Wizard(wizardContext, {
        title: vscode_1.l10n.t('Create a financial account'),
        promptSteps: [
            new HoldingDeleteConfirmStep_1.HoldingDeleteConfirmStep(),
        ],
        executeSteps: [
            new HoldingDeleteStep_1.HoldingDeleteStep(),
        ],
    });
    await wizard.prompt();
    await wizard.execute();
    void context.ui.showInformationMessage(vscode_1.l10n.t('Deleted holding "{0}"', (0, nonNull_1.nonNullValueAndProp)(wizardContext.holding, 'name')));
    extensionVariables_1.ext.resourceCache.delete(HoldingsItem_1.HoldingsItem.generatePiExtHoldingsId(item.email));
    extensionVariables_1.ext.portfolioInstrumentsTdp.refresh(item.parent);
}


/***/ }),
/* 152 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HoldingDeleteConfirmStep = void 0;
const vscode_1 = __webpack_require__(1);
const PromptStep_1 = __webpack_require__(69);
class HoldingDeleteConfirmStep extends PromptStep_1.PromptStep {
    async prompt(context) {
        const warning = vscode_1.l10n.t('Are you sure you want to delete holding "{0}"?', context.holding.name);
        await context.ui.showWarningMessage(warning, { modal: true }, vscode_1.l10n.t('Confirm'));
    }
    shouldPrompt() {
        return true;
    }
}
exports.HoldingDeleteConfirmStep = HoldingDeleteConfirmStep;


/***/ }),
/* 153 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HoldingDeleteStep = void 0;
const vscode_1 = __webpack_require__(1);
const nonNull_1 = __webpack_require__(12);
const deleteHolding_1 = __webpack_require__(154);
class HoldingDeleteStep {
    priority;
    async execute(context, progress) {
        progress.report({ message: vscode_1.l10n.t("Deleting holding...") });
        const response = await (0, deleteHolding_1.deleteHolding)((0, nonNull_1.nonNullProp)(context, 'token'), context.holding.holding_id);
        if (response.error) {
            throw new Error(response.error);
        }
    }
    shouldExecute(context) {
        return !!context.holding;
    }
}
exports.HoldingDeleteStep = HoldingDeleteStep;


/***/ }),
/* 154 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deleteHolding = deleteHolding;
const constants_1 = __webpack_require__(7);
const settingUtils_1 = __webpack_require__(11);
async function deleteHolding(token, holdingId) {
    const response = await fetch(`${settingUtils_1.settingUtils.getApiEndpointBaseUrl()}/api/${constants_1.latestApiVersion}/holdings/${holdingId}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return await response.json();
}


/***/ }),
/* 155 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateHolding = updateHolding;
const vscode_1 = __webpack_require__(1);
const nonNull_1 = __webpack_require__(12);
const tokenUtils_1 = __webpack_require__(6);
const Wizard_1 = __webpack_require__(67);
const extensionVariables_1 = __webpack_require__(2);
const HoldingNameStep_1 = __webpack_require__(142);
const HoldingAssetCategoryStep_1 = __webpack_require__(148);
const HoldingTypeListStep_1 = __webpack_require__(143);
const HoldingUpdateStep_1 = __webpack_require__(156);
const HoldingsItem_1 = __webpack_require__(20);
async function updateHolding(context, item) {
    const wizardContext = {
        ...context,
        email: item.email,
        token: (0, nonNull_1.nonNullValue)(await (0, tokenUtils_1.getAuthToken)(item.email)),
        holding: item.holding,
    };
    const wizard = new Wizard_1.Wizard(wizardContext, {
        title: vscode_1.l10n.t('Update financial holding'),
        promptSteps: [
            new HoldingNameStep_1.HoldingNameStep(),
            new HoldingAssetCategoryStep_1.HoldingAssetCategoryStep(),
            new HoldingTypeListStep_1.HoldingTypeListStep(),
        ],
        executeSteps: [
            new HoldingUpdateStep_1.HoldingUpdateStep(),
        ],
    });
    await wizard.prompt();
    await wizard.execute();
    void context.ui.showInformationMessage(vscode_1.l10n.t('Update holding "{0}"', (0, nonNull_1.nonNullValueAndProp)(wizardContext.updatedHolding, 'name')));
    extensionVariables_1.ext.resourceCache.delete(HoldingsItem_1.HoldingsItem.generatePiExtHoldingsId(item.email));
    extensionVariables_1.ext.portfolioInstrumentsTdp.refresh(item.parent);
}


/***/ }),
/* 156 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.HoldingUpdateStep = void 0;
const nonNull_1 = __webpack_require__(12);
const ExecuteStep_1 = __webpack_require__(104);
const updateHolding_1 = __webpack_require__(157);
class HoldingUpdateStep extends ExecuteStep_1.ExecuteStep {
    priority;
    async execute(context, progress) {
        progress.report({ message: "Updating holding..." });
        const response = await (0, updateHolding_1.updateHolding)(context.token, context.holding.holding_id, {
            name: (0, nonNull_1.nonNullProp)(context, 'holdingName'),
            asset_category: (0, nonNull_1.nonNullProp)(context, 'holdingAssetCategory'),
            ticker: context.holdingTicker,
            expense_ratio_pct: context.holdingExpenseRatioPct,
            interest_rate_pct: context.holdingInterestRatePct,
            maturation_date: context.holdingMaturationDate,
            is_deprecated: false,
        });
        if (response.error) {
            throw new Error(response.error);
        }
        context.updatedHolding = response.data?.holding;
    }
    shouldExecute(context) {
        return !context.updatedHolding;
    }
}
exports.HoldingUpdateStep = HoldingUpdateStep;


/***/ }),
/* 157 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateHolding = updateHolding;
const constants_1 = __webpack_require__(7);
const settingUtils_1 = __webpack_require__(11);
async function updateHolding(token, holdingId, payload) {
    const response = await fetch(`${settingUtils_1.settingUtils.getApiEndpointBaseUrl()}/api/${constants_1.latestApiVersion}/holdings/${holdingId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });
    return await response.json();
}


/***/ }),
/* 158 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.registerCommand = registerCommand;
const vscode_1 = __webpack_require__(1);
const extensionVariables_1 = __webpack_require__(2);
const UserInterface_1 = __webpack_require__(159);
;
function registerCommand(commandId, callback) {
    extensionVariables_1.ext.context.subscriptions.push(vscode_1.commands.registerCommand(commandId, wrapCallbackWithCommandContext(commandId, callback)));
}
function wrapCallbackWithCommandContext(commandId, callback) {
    return async (...args) => {
        const commandContext = {
            ui: new UserInterface_1.UserInterface(),
            metadata: {
                commandId,
                start: Date.now(),
            },
        };
        await callback(commandContext, ...args);
        commandContext.metadata.end = Date.now();
    };
}


/***/ }),
/* 159 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.UserInterface = void 0;
const vscode_1 = __webpack_require__(1);
const constants_1 = __webpack_require__(7);
const showInputBox_1 = __webpack_require__(160);
const showQuickPick_1 = __webpack_require__(161);
class UserInterface {
    showInformationMessage(message, ...items) {
        return vscode_1.window.showInformationMessage(message, ...items);
    }
    async showInputBox(options) {
        return await (0, showInputBox_1.showInputBox)(options);
    }
    async showWarningMessage(message, options, ...items) {
        const result = await vscode_1.window.showWarningMessage(message, options, ...items);
        if (!result) {
            throw new Error(constants_1.operationCancelled);
        }
        return result;
    }
    async showQuickPick(items, options) {
        return await (0, showQuickPick_1.showQuickPick)(items, options);
    }
}
exports.UserInterface = UserInterface;


/***/ }),
/* 160 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.showInputBox = showInputBox;
const vscode_1 = __webpack_require__(1);
const constants_1 = __webpack_require__(7);
async function showInputBox(options) {
    const disposables = [];
    try {
        const inputBox = vscode_1.window.createInputBox();
        inputBox.title = options.title;
        inputBox.prompt = options.prompt;
        inputBox.value = options.value ?? '';
        inputBox.password = !!options.password;
        inputBox.placeholder = options.placeHolder;
        inputBox.ignoreFocusOut = options.ignoreFocusOut ?? true;
        inputBox.valueSelection = options.valueSelection;
        let latestValidation = options.validateInput ? Promise.resolve(options.validateInput(inputBox.value)) : Promise.resolve('');
        return await new Promise((resolve, reject) => {
            disposables.push(inputBox.onDidChangeValue(async (value) => {
                if (options.validateInput) {
                    const validation = Promise.resolve(options.validateInput(value));
                    latestValidation = validation;
                    const message = await validation;
                    if (validation === latestValidation) {
                        inputBox.validationMessage = message || '';
                    }
                }
            }), inputBox.onDidAccept(async () => {
                inputBox.enabled = false;
                inputBox.busy = true;
                const validateInputResult = await latestValidation;
                if (!validateInputResult) {
                    resolve(inputBox.value);
                }
                else if (validateInputResult) {
                    inputBox.validationMessage = validateInputResult;
                }
                inputBox.enabled = true;
                inputBox.busy = false;
            }), inputBox.onDidHide(() => {
                reject(new Error(constants_1.operationCancelled));
            }), inputBox);
            inputBox.show();
        });
    }
    finally {
        disposables.forEach(d => d.dispose());
    }
}


/***/ }),
/* 161 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.showQuickPick = showQuickPick;
const vscode_1 = __webpack_require__(1);
const constants_1 = __webpack_require__(7);
async function showQuickPick(picks, options) {
    const disposables = [];
    try {
        const quickPick = vscode_1.window.createQuickPick();
        quickPick.title = options?.title;
        quickPick.placeholder = options?.placeHolder;
        quickPick.canSelectMany = !!options?.canPickMany;
        quickPick.matchOnDetail = !!options?.matchOnDetail;
        quickPick.matchOnDescription = !!options?.matchOnDescription;
        quickPick.ignoreFocusOut = options?.ignoreFocusOut ?? true;
        return await new Promise(async (resolve, reject) => {
            disposables.push(quickPick.onDidAccept(() => {
                try {
                    if (options?.canPickMany) {
                        resolve(Array.from(quickPick.selectedItems));
                    }
                    else {
                        const selectedItem = quickPick.selectedItems[0];
                        if (selectedItem) {
                            resolve(selectedItem);
                        }
                    }
                }
                catch (error) {
                    reject(error);
                }
            }), quickPick.onDidHide(() => {
                reject(new Error(constants_1.operationCancelled));
            }), quickPick);
            quickPick.items = picks;
            quickPick.show();
        });
    }
    finally {
        disposables.forEach(d => d.dispose());
    }
}


/***/ }),
/* 162 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.setApiEndpoint = setApiEndpoint;
const vscode_1 = __webpack_require__(1);
const ApiEndpointPromptStep_1 = __webpack_require__(163);
const ApiEndpointSetStep_1 = __webpack_require__(164);
const Wizard_1 = __webpack_require__(67);
const extensionVariables_1 = __webpack_require__(2);
async function setApiEndpoint(context) {
    const wizard = new Wizard_1.Wizard(context, {
        title: vscode_1.l10n.t('Set API Endpoint'),
        promptSteps: [
            new ApiEndpointPromptStep_1.ApiEndpointPromptStep(),
        ],
        executeSteps: [
            new ApiEndpointSetStep_1.ApiEndpointSetStep(),
        ],
    });
    await wizard.prompt();
    await wizard.execute();
    void context.ui.showInformationMessage(vscode_1.l10n.t('Updated target API endpoint.'));
    extensionVariables_1.ext.portfolioInstrumentsTdp.refresh();
}


/***/ }),
/* 163 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiEndpointPromptStep = void 0;
const vscode_1 = __webpack_require__(1);
const PromptStep_1 = __webpack_require__(69);
class ApiEndpointPromptStep extends PromptStep_1.PromptStep {
    async prompt(context) {
        context.newApiEndpoint = await context.ui.showInputBox({
            title: this.title,
            value: 'http://localhost:3000',
            prompt: vscode_1.l10n.t('Enter the API endpoint base URL'),
            // Todo: Could add validation, but don't care much about it to be honest
        });
    }
    shouldPrompt(context) {
        return !context.newApiEndpoint;
    }
}
exports.ApiEndpointPromptStep = ApiEndpointPromptStep;


/***/ }),
/* 164 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ApiEndpointSetStep = void 0;
const ExecuteStep_1 = __webpack_require__(104);
const nonNull_1 = __webpack_require__(12);
const settingUtils_1 = __webpack_require__(11);
class ApiEndpointSetStep extends ExecuteStep_1.ExecuteStep {
    priority;
    async execute(context, progress) {
        progress.report({ message: "Setting API endpoint..." });
        const newApiEndpoint = (0, nonNull_1.nonNullProp)(context, 'newApiEndpoint');
        await settingUtils_1.settingUtils.updateApiEndpointBaseUrl(newApiEndpoint);
    }
    shouldExecute() {
        return true;
    }
}
exports.ApiEndpointSetStep = ApiEndpointSetStep;


/***/ }),
/* 165 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.decrementSnapshotPage = decrementSnapshotPage;
const vscode_1 = __webpack_require__(1);
function decrementSnapshotPage(context, item) {
    const page = item.decrementPage();
    context.ui.showInformationMessage(vscode_1.l10n.t('Updated snapshot pagination number to {0}', page));
}


/***/ }),
/* 166 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deleteSnapshot = deleteSnapshot;
const vscode_1 = __webpack_require__(1);
const nonNull_1 = __webpack_require__(12);
const tokenUtils_1 = __webpack_require__(6);
const Wizard_1 = __webpack_require__(67);
const extensionVariables_1 = __webpack_require__(2);
const SnapshotDeleteConfirmStep_1 = __webpack_require__(167);
const SnapshotDeleteStep_1 = __webpack_require__(168);
async function deleteSnapshot(context, item) {
    const wizardContext = {
        ...context,
        email: item.email,
        token: (0, nonNull_1.nonNullValue)(await (0, tokenUtils_1.getAuthToken)(item.email)),
        snapshot: item.snapshot,
    };
    const wizard = new Wizard_1.Wizard(wizardContext, {
        title: vscode_1.l10n.t('Delete snapshot'),
        promptSteps: [
            new SnapshotDeleteConfirmStep_1.SnapshotDeleteConfirmStep(),
        ],
        executeSteps: [
            new SnapshotDeleteStep_1.SnapshotDeleteStep(),
        ],
    });
    await wizard.prompt();
    await wizard.execute();
    void context.ui.showInformationMessage(vscode_1.l10n.t('Deleted snapshot dated "{0}"', (0, nonNull_1.nonNullValueAndProp)(wizardContext.snapshot, 'snap_date')));
    extensionVariables_1.ext.portfolioInstrumentsTdp.refresh();
}


/***/ }),
/* 167 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotDeleteConfirmStep = void 0;
const vscode_1 = __webpack_require__(1);
const PromptStep_1 = __webpack_require__(69);
class SnapshotDeleteConfirmStep extends PromptStep_1.PromptStep {
    async prompt(context) {
        const warning = vscode_1.l10n.t('Are you sure you want to delete snapshot dated "{0}"?', context.snapshot.snap_date);
        await context.ui.showWarningMessage(warning, { modal: true }, vscode_1.l10n.t('Confirm'));
    }
    shouldPrompt() {
        return true;
    }
}
exports.SnapshotDeleteConfirmStep = SnapshotDeleteConfirmStep;


/***/ }),
/* 168 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotDeleteStep = void 0;
const vscode_1 = __webpack_require__(1);
const nonNull_1 = __webpack_require__(12);
const deleteSnapshot_1 = __webpack_require__(169);
class SnapshotDeleteStep {
    priority;
    async execute(context, progress) {
        progress.report({ message: vscode_1.l10n.t("Deleting snapshot...") });
        const response = await (0, deleteSnapshot_1.deleteSnapshot)((0, nonNull_1.nonNullProp)(context, 'token'), context.snapshot.snap_id);
        if (response.error) {
            throw new Error(response.error);
        }
    }
    shouldExecute(context) {
        return !!context.snapshot;
    }
}
exports.SnapshotDeleteStep = SnapshotDeleteStep;


/***/ }),
/* 169 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deleteSnapshot = deleteSnapshot;
const constants_1 = __webpack_require__(7);
const settingUtils_1 = __webpack_require__(11);
async function deleteSnapshot(token, snapshotId) {
    const response = await fetch(`${settingUtils_1.settingUtils.getApiEndpointBaseUrl()}/api/${constants_1.latestApiVersion}/snapshots/${snapshotId}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return await response.json();
}


/***/ }),
/* 170 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.incrementSnapshotPage = incrementSnapshotPage;
const vscode_1 = __webpack_require__(1);
function incrementSnapshotPage(context, item) {
    const page = item.incrementPage();
    context.ui.showInformationMessage(vscode_1.l10n.t('Updated snapshot pagination number to {0}', page));
}


/***/ }),
/* 171 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.plotSnapshots = plotSnapshots;
const vscode = __importStar(__webpack_require__(1));
const nonNull_1 = __webpack_require__(12);
const tokenUtils_1 = __webpack_require__(6);
const Wizard_1 = __webpack_require__(67);
const SnapshotsPlotStep_1 = __webpack_require__(172);
const SnapshotsStartDatePromptStep_1 = __webpack_require__(174);
const SnapshotEndDatePromptStep_1 = __webpack_require__(175);
const SnapshotsGetByDateRangeStep_1 = __webpack_require__(176);
const getSnapshots_1 = __webpack_require__(29);
async function plotSnapshots(context, item) {
    const wizardContext = {
        ...context,
        email: item.email,
        token: (0, nonNull_1.nonNullValue)(await (0, tokenUtils_1.getAuthToken)(item.email)),
    };
    const wizard = new Wizard_1.Wizard(wizardContext, {
        title: vscode.l10n.t('Plot Snapshot Range'),
        promptSteps: [
            new SnapshotsStartDatePromptStep_1.SnapshotStartDatePromptStep({ startDate: (await (0, getSnapshots_1.getSnapshotsEarliest)(wizardContext.token)).data?.snapshots[0]?.snap_date }),
            new SnapshotEndDatePromptStep_1.SnapshotEndDatePromptStep({ endDate: (await (0, getSnapshots_1.getSnapshotsLatest)(wizardContext.token)).data?.snapshots[0]?.snap_date }),
        ],
        executeSteps: [
            new SnapshotsGetByDateRangeStep_1.SnapshotsGetByDateRangeStep(),
            new SnapshotsPlotStep_1.SnapshotsPlotStep(),
        ],
    });
    await wizard.prompt();
    await wizard.execute();
}


/***/ }),
/* 172 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotsPlotStep = void 0;
exports.estimatePortfolioAnnotation = estimatePortfolioAnnotation;
const vscode = __importStar(__webpack_require__(1));
const ExecuteStep_1 = __webpack_require__(104);
const extensionVariables_1 = __webpack_require__(2);
const nonNull_1 = __webpack_require__(12);
const dateUtils_1 = __webpack_require__(173);
class SnapshotsPlotStep extends ExecuteStep_1.ExecuteStep {
    priority;
    constructor() {
        super();
    }
    async execute(context) {
        const viewType = 'snapshotsLinePlot';
        const title = 'Net Worth Over Time';
        const panel = vscode.window.createWebviewPanel(viewType, title, vscode.ViewColumn.One, { enableScripts: true });
        panel.webview.html = this.generateWebviewContent(context, panel);
    }
    shouldExecute(context) {
        return !!context.snapshots?.length;
    }
    generateWebviewContent(context, panel) {
        const plotJsUri = panel.webview.asWebviewUri(vscode.Uri.joinPath(extensionVariables_1.ext.context.extensionUri, 'resources', 'chart', 'plot.js'));
        const minifiedChartJsUri = panel.webview.asWebviewUri(vscode.Uri.joinPath(extensionVariables_1.ext.context.extensionUri, 'resources', 'chart', 'chart.min.js'));
        const minifiedChartAnnotationJsUri = panel.webview.asWebviewUri(vscode.Uri.joinPath(extensionVariables_1.ext.context.extensionUri, 'resources', 'chart', 'chart.annotation.min.js'));
        const snapshots = this.dedupeSnapshotsByMonth((0, nonNull_1.nonNullProp)(context, 'snapshots')).reverse();
        const { xAxis, yAxis } = this.calculateChartAxisValues(snapshots);
        const verticalAnnotations = this.getAnnualizedChartAnnotations(snapshots);
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Net Worth Over Time</title>
            </head>
            <body>
                <canvas id="chart"></canvas>

                <script>
                    // Pass in snapshot data
                    const xAxis = ${JSON.stringify(xAxis)};
                    const yAxis = ${JSON.stringify(yAxis)};
                    const verticalAnnotations = ${JSON.stringify(verticalAnnotations)};
                </script>

                <script src="${minifiedChartJsUri}"></script>
                <script src="${minifiedChartAnnotationJsUri}"></script>
                <script src="${plotJsUri}"></script>
            </body>
            </html>
        `;
    }
    calculateChartAxisValues(snapshots) {
        const startYear = Number((0, nonNull_1.nonNullValue)((0, nonNull_1.nonNullValue)(snapshots.at(0)).snap_date.split('/').at(-1)));
        const endYear = Number((0, nonNull_1.nonNullValue)((0, nonNull_1.nonNullValue)(snapshots.at(-1)).snap_date.split('/').at(-1)));
        const xAxis = this.calculateXAxisValues(startYear, endYear + 1);
        const yAxis = this.calculateYAxisValues(snapshots, xAxis);
        return { xAxis, yAxis };
    }
    // Example: ['Jan-2025', 'Feb-2025', etc...]
    calculateXAxisValues(startYear, endYear) {
        const xAxis = [];
        let date = '';
        for (let i = 0; i < (endYear - startYear) * 12; i++) {
            if (i === 0) {
                date = `01/${startYear}`;
                xAxis.push(`Jan-${startYear}`);
                continue;
            }
            const incremented = (0, dateUtils_1.getIncrementingDate)(date);
            date = incremented.date;
            xAxis.push(incremented.monthYearLabel);
        }
        return xAxis;
    }
    calculateYAxisValues(snapshots, xAxis) {
        const yAxis = new Array(xAxis.length).fill(null);
        let x = 0;
        for (const snapshot of snapshots) {
            while (x < xAxis.length) {
                const yearMonthLabel = xAxis[x];
                const xAxisMonth = Number((0, dateUtils_1.getMonthFromMonthYearLabel)(yearMonthLabel));
                const xAxisYear = Number((0, dateUtils_1.getYearFromMonthYearLabel)(yearMonthLabel));
                const snapshotMonth = Number((0, dateUtils_1.getMonthFromDate)(snapshot.snap_date));
                const snapshotYear = Number((0, dateUtils_1.getYearFromDate)(snapshot.snap_date));
                if (xAxisMonth === snapshotMonth && xAxisYear && snapshotYear) {
                    yAxis[x] = snapshot.total;
                    x++;
                    break;
                }
                x++;
            }
        }
        return yAxis;
    }
    // These are vertical chart lines shown at each yearly interval.
    // It shows year totals, % appreciation, etc.
    getAnnualizedChartAnnotations(snapshots) {
        const annotations = [];
        let lastSnapshot;
        for (const snapshot of snapshots) {
            if (!lastSnapshot) {
                lastSnapshot = snapshot;
                continue;
            }
            const lastSnapshotYear = Number((0, dateUtils_1.getYearFromDate)(lastSnapshot.snap_date));
            const currentSnapshotYear = Number((0, dateUtils_1.getYearFromDate)(snapshot.snap_date));
            if ((currentSnapshotYear - lastSnapshotYear) === 1) {
                const snapshotOne = { value: lastSnapshot.total, date: lastSnapshot.snap_date };
                const snapshotTwo = { value: snapshot.total, date: snapshot.snap_date };
                const annotation = estimatePortfolioAnnotation(snapshotOne, snapshotTwo, `01/01/${currentSnapshotYear}`);
                const lastAnnotation = annotations.at(-1);
                if (lastAnnotation) {
                    annotation.annualIncreasePct = (annotation.rawTotal - lastAnnotation.rawTotal) / lastAnnotation.rawTotal * 100;
                }
                else {
                    annotation.annualIncreasePct = (annotation.rawTotal - snapshots[0].total) / snapshot.total * 100;
                }
                annotations.push(annotation);
            }
            lastSnapshot = snapshot;
        }
        return annotations;
    }
    // Since we only plot values per month, values in the same month should be deduped
    dedupeSnapshotsByMonth(snapshots) {
        return snapshots.reduce(((dedupedSnapshots, currentSnapshot) => {
            const lastSnapshot = dedupedSnapshots.at(-1);
            if (!lastSnapshot) {
                dedupedSnapshots.push(currentSnapshot);
                return dedupedSnapshots;
            }
            const lastSnapshotDate = (0, nonNull_1.nonNullProp)(lastSnapshot, 'snap_date');
            const lastSnapshotMonth = Number((0, dateUtils_1.getMonthFromDate)(lastSnapshotDate));
            const lastSnapshotYear = Number((0, dateUtils_1.getYearFromDate)(lastSnapshotDate));
            const currentSnapshotDate = (0, nonNull_1.nonNullProp)(currentSnapshot, 'snap_date');
            const currentSnapshotMonth = Number((0, dateUtils_1.getMonthFromDate)(currentSnapshotDate));
            const currentSnapshotYear = Number((0, dateUtils_1.getYearFromDate)(currentSnapshotDate));
            if (lastSnapshotMonth === currentSnapshotMonth && lastSnapshotYear === currentSnapshotYear) {
                return dedupedSnapshots;
            }
            dedupedSnapshots.push(currentSnapshot);
            return dedupedSnapshots;
        }), []);
    }
}
exports.SnapshotsPlotStep = SnapshotsPlotStep;
/**
 * Estimates the portfolio value on a target date using linear interpolation.
 * The provided snapshots should be in date order and be within one year of each other.
 *
 * @param value Portfolio snapshot value at the time
 * @param date Portfolio snapshot date (mm/dd/yyyy)
 * @param targetDate Date we want to estimate a value for (mm/dd/yyyy)
 */
function estimatePortfolioAnnotation(snapshotOne, snapshotTwo, targetDate) {
    if (Math.abs(Number((0, dateUtils_1.getYearFromDate)(snapshotOne.date)) - Number((0, dateUtils_1.getYearFromDate)(snapshotTwo.date))) > 1) {
        throw new Error('Snapshot dates are more than a year apart.');
    }
    if (snapshotOne.date === targetDate) {
        return {
            xAxis: targetDate,
            rawTotal: snapshotOne.value,
        };
    }
    if (snapshotTwo.date === targetDate) {
        return {
            xAxis: targetDate,
            rawTotal: snapshotTwo.value,
        };
    }
    const timeOne = new Date((0, dateUtils_1.convertDateToISOFormat)(snapshotOne.date)).getTime();
    const timeTwo = new Date((0, dateUtils_1.convertDateToISOFormat)(snapshotTwo.date)).getTime();
    const targetTime = new Date((0, dateUtils_1.convertDateToISOFormat)(targetDate)).getTime();
    if (timeOne >= timeTwo) {
        throw new Error("Snapshot 1 must be earlier than Snapshot 2.");
    }
    const estimatedValue = snapshotOne.value +
        ((targetTime - timeOne) / (timeTwo - timeOne)) * (snapshotTwo.value - snapshotOne.value);
    const [month, _, year] = targetDate.split('/');
    return {
        xAxis: `${dateUtils_1.months[Number(month) - 1]}-${year}`,
        rawTotal: estimatedValue,
    };
}


/***/ }),
/* 173 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.months = void 0;
exports.getIncrementingDate = getIncrementingDate;
exports.getMonthFromDate = getMonthFromDate;
exports.getYearFromDate = getYearFromDate;
exports.getMonthFromMonthYearLabel = getMonthFromMonthYearLabel;
exports.getYearFromMonthYearLabel = getYearFromMonthYearLabel;
exports.convertDateToISOFormat = convertDateToISOFormat;
const nonNull_1 = __webpack_require__(12);
exports.months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
/**
 * @param previousDate mm/yyyy
 * @returns The `date` as a string in mm/yyyy format
 * @returns The `label` as a string in Month-yyyy format
 */
function getIncrementingDate(previousDate) {
    const previousMonth = Number(getMonthFromDate(previousDate));
    const previousYear = Number(getYearFromDate(previousDate));
    let nextMonth = previousMonth % 12 + 1;
    const nextYear = previousMonth === 12 ? previousYear + 1 : previousYear;
    return {
        date: `${nextMonth.toString().padStart(2, '0')}/${nextYear}`,
        monthYearLabel: `${exports.months[nextMonth - 1]}-${nextYear}`,
    };
}
/**
 * @param date mm/dd/yyyy or mm/yyyy
 * @returns mm
 */
function getMonthFromDate(date) {
    return (0, nonNull_1.nonNullValue)(date.split('/').at(0));
}
/**
 * @param date mm/dd/yyyy or mm/yyyy
 * @returns yyyy
 */
function getYearFromDate(date) {
    return (0, nonNull_1.nonNullValue)(date.split('/').at(-1));
}
const monthsMap = new Map([
    ['Jan', '01'],
    ['Feb', '02'],
    ['Mar', '03'],
    ['Apr', '04'],
    ['May', '05'],
    ['Jun', '06'],
    ['Jul', '07'],
    ['Aug', '08'],
    ['Sep', '09'],
    ['Oct', '10'],
    ['Nov', '11'],
    ['Dec', '12'],
]);
/**
 * @param label A date in Month-yyyy format
 * @returns mm
 */
function getMonthFromMonthYearLabel(label) {
    const month = label.split('-')[0];
    return (0, nonNull_1.nonNullValue)(monthsMap.get(month));
}
/**
 * @param label A date in Month-yyyy format
 * @returns yyyy
 */
function getYearFromMonthYearLabel(label) {
    const year = label.split('-')[1];
    return year;
}
/**
 * @param date mm/dd/yyyy
 * @returns yyyy-mm-dd
 */
function convertDateToISOFormat(date) {
    const [month, day, year] = date.split('/');
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
}


/***/ }),
/* 174 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotStartDatePromptStep = void 0;
const vscode_1 = __webpack_require__(1);
const PromptStep_1 = __webpack_require__(69);
const validationUtils_1 = __webpack_require__(70);
class SnapshotStartDatePromptStep extends PromptStep_1.PromptStep {
    options;
    constructor(options = {}) {
        super();
        this.options = options;
    }
    async prompt(context) {
        context.startDate = (await context.ui.showInputBox({
            title: this.title,
            prompt: vscode_1.l10n.t('Enter a start date (mm/dd/yyyy).'),
            value: this.options.startDate,
            validateInput: this.validateInput,
        }))?.trim();
    }
    shouldPrompt(context) {
        return !context.startDate;
    }
    validateInput(value = '') {
        value = value.trim();
        if (!value) {
            return vscode_1.l10n.t('A start date (mm/dd/yyyy) is required.');
        }
        const tc = {
            lowerLimitIncl: 10,
            upperLimitIncl: 10,
        };
        if (!validationUtils_1.validationUtils.hasValidCharLength(value, tc)) {
            return validationUtils_1.validationUtils.getInvalidCharLengthMessage(tc);
        }
        const pattern = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!pattern.test(value)) {
            return vscode_1.l10n.t('Start date must have the following format: mm/dd/yyyy');
        }
        const [month, day, year] = value.split('/').map(Number);
        const date = new Date(year, month - 1, day);
        // If the date is not a valid calendar date (like February 30 or April 31), the Date object will adjust the day to a valid date
        // We can check for adjustments as a way to ensure the dates submitted are real dates
        if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
            return vscode_1.l10n.t('Start date must be a real date (mm/dd/yyyy)');
        }
        // We do it this way to allow entering the same day
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        if (date.getTime() > today.getTime()) {
            return vscode_1.l10n.t('Start date cannot be in the future.');
        }
        return undefined;
    }
}
exports.SnapshotStartDatePromptStep = SnapshotStartDatePromptStep;


/***/ }),
/* 175 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotEndDatePromptStep = void 0;
const vscode_1 = __webpack_require__(1);
const PromptStep_1 = __webpack_require__(69);
const validationUtils_1 = __webpack_require__(70);
class SnapshotEndDatePromptStep extends PromptStep_1.PromptStep {
    options;
    constructor(options = {}) {
        super();
        this.options = options;
    }
    async prompt(context) {
        context.endDate = (await context.ui.showInputBox({
            title: this.title,
            prompt: vscode_1.l10n.t('Enter an end date (mm/dd/yyyy).'),
            value: this.options.endDate,
            validateInput: (value) => this.validateInput(context, value),
        }))?.trim();
    }
    shouldPrompt(context) {
        return !context.endDate;
    }
    validateInput(context, value = '') {
        value = value.trim();
        if (!value) {
            return vscode_1.l10n.t('An end date (mm/dd/yyyy) is required.');
        }
        const tc = {
            lowerLimitIncl: 10,
            upperLimitIncl: 10,
        };
        if (!validationUtils_1.validationUtils.hasValidCharLength(value, tc)) {
            return validationUtils_1.validationUtils.getInvalidCharLengthMessage(tc);
        }
        const pattern = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!pattern.test(value)) {
            return vscode_1.l10n.t('End date must have the following format: mm/dd/yyyy');
        }
        const [month, day, year] = value.split('/').map(Number);
        const date = new Date(year, month - 1, day);
        // If the date is not a valid calendar date (like February 30 or April 31), the Date object will adjust the day to a valid date
        // We can check for adjustments as a way to ensure the dates submitted are real dates
        if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
            return vscode_1.l10n.t('End date must be a real date (mm/dd/yyyy)');
        }
        // We do it this way to allow entering the same day
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        if (date.getTime() > today.getTime()) {
            return vscode_1.l10n.t('End date cannot be in the future.');
        }
        if (context.startDate) {
            const [month, day, year] = context.startDate.split('/').map(Number);
            const startDate = new Date(year, month - 1, day);
            if (date.getTime() < startDate.getTime()) {
                return vscode_1.l10n.t('End date cannot be before the start date.');
            }
        }
        return undefined;
    }
}
exports.SnapshotEndDatePromptStep = SnapshotEndDatePromptStep;


/***/ }),
/* 176 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotsGetByDateRangeStep = void 0;
const vscode_1 = __webpack_require__(1);
const ExecuteStep_1 = __webpack_require__(104);
const getSnapshots_1 = __webpack_require__(29);
class SnapshotsGetByDateRangeStep extends ExecuteStep_1.ExecuteStep {
    priority;
    async execute(context, progress) {
        if (!context.startDate || !context.endDate) {
            context.snapshots = [];
            return;
        }
        progress.report({ message: vscode_1.l10n.t("Getting snapshots...") });
        const response = await (0, getSnapshots_1.getSnapshotsByDateRange)(context.token, context.startDate, context.endDate);
        if (response.error) {
            context.snapshots = [];
            return;
        }
        context.snapshots = response.data?.snapshots;
    }
    shouldExecute(context) {
        return !context.snapshots;
    }
}
exports.SnapshotsGetByDateRangeStep = SnapshotsGetByDateRangeStep;


/***/ }),
/* 177 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateMaturationEnd = updateMaturationEnd;
const vscode_1 = __webpack_require__(1);
const nonNull_1 = __webpack_require__(12);
const tokenUtils_1 = __webpack_require__(6);
const Wizard_1 = __webpack_require__(67);
const extensionVariables_1 = __webpack_require__(2);
const MaturationDatePromptStep_1 = __webpack_require__(178);
const SnapshotMaturationEndItem_1 = __webpack_require__(50);
const MaturationEndUpdateStep_1 = __webpack_require__(179);
async function updateMaturationEnd(context, item) {
    const wizardContext = {
        ...context,
        email: item.email,
        token: (0, nonNull_1.nonNullValue)(await (0, tokenUtils_1.getAuthToken)(item.email)),
        snapshotId: item.snapshotData.snap_id,
    };
    const wizard = new Wizard_1.Wizard(wizardContext, {
        title: vscode_1.l10n.t('Update maturation end date'),
        promptSteps: [
            new MaturationDatePromptStep_1.MaturationDatePromptStep({
                default: SnapshotMaturationEndItem_1.SnapshotMaturationEndItem.getMaturationEnd(wizardContext.email, wizardContext.snapshotId),
                prompt: vscode_1.l10n.t('Enter maturation end date (mm/dd/yyyy)'),
            }),
        ],
        executeSteps: [
            new MaturationEndUpdateStep_1.MaturationEndUpdateStep(),
        ],
    });
    await wizard.prompt();
    await wizard.execute();
    void context.ui.showInformationMessage(vscode_1.l10n.t('Update maturation end date to "{0}"', (0, nonNull_1.nonNullProp)(wizardContext, 'maturationDate')));
    extensionVariables_1.ext.portfolioInstrumentsTdp.refresh(item.parent);
}


/***/ }),
/* 178 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MaturationDatePromptStep = void 0;
const vscode_1 = __webpack_require__(1);
const PromptStep_1 = __webpack_require__(69);
const validationUtils_1 = __webpack_require__(70);
class MaturationDatePromptStep extends PromptStep_1.PromptStep {
    options;
    constructor(options) {
        super();
        this.options = options;
    }
    async prompt(context) {
        context.maturationDate = (await context.ui.showInputBox({
            title: this.title,
            prompt: this.options.prompt,
            value: this.options.default,
            validateInput: this.validateInput,
        }))?.trim();
    }
    shouldPrompt(context) {
        return !context.maturationDate;
    }
    validateInput(value) {
        if (!value) {
            return undefined;
        }
        value = value.trim();
        const tc = {
            lowerLimitIncl: 10,
            upperLimitIncl: 10,
        };
        if (!validationUtils_1.validationUtils.hasValidCharLength(value, tc)) {
            return validationUtils_1.validationUtils.getInvalidCharLengthMessage(tc);
        }
        const pattern = /^\d{2}\/\d{2}\/\d{4}$/;
        if (!pattern.test(value)) {
            return vscode_1.l10n.t('Value must have the following format: mm/dd/yyyy');
        }
        const [month, day, year] = value.split('/').map(Number);
        const date = new Date(year, month - 1, day);
        // If the date is not a valid calendar date (like February 30 or April 31), the Date object will adjust the day to a valid date
        // We can check for adjustments as a way to ensure the dates submitted are real dates
        if (date.getFullYear() !== year || date.getMonth() !== month - 1 || date.getDate() !== day) {
            return vscode_1.l10n.t('Value must be a real date (mm/dd/yyyy)');
        }
        return undefined;
    }
}
exports.MaturationDatePromptStep = MaturationDatePromptStep;


/***/ }),
/* 179 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MaturationEndUpdateStep = void 0;
const vscode_1 = __webpack_require__(1);
const SnapshotMaturationEndItem_1 = __webpack_require__(50);
const ExecuteStep_1 = __webpack_require__(104);
class MaturationEndUpdateStep extends ExecuteStep_1.ExecuteStep {
    priority;
    async execute(context, progress) {
        progress.report({ message: vscode_1.l10n.t("Updating maturation end...") });
        SnapshotMaturationEndItem_1.SnapshotMaturationEndItem.setMaturationEnd(context.email, context.snapshotId, context.maturationDate || undefined);
    }
    shouldExecute() {
        return true;
    }
}
exports.MaturationEndUpdateStep = MaturationEndUpdateStep;


/***/ }),
/* 180 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateMaturationStart = updateMaturationStart;
const vscode_1 = __webpack_require__(1);
const nonNull_1 = __webpack_require__(12);
const tokenUtils_1 = __webpack_require__(6);
const Wizard_1 = __webpack_require__(67);
const extensionVariables_1 = __webpack_require__(2);
const SnapshotMaturationStartItem_1 = __webpack_require__(49);
const MaturationDatePromptStep_1 = __webpack_require__(178);
const MaturationStartUpdateStep_1 = __webpack_require__(181);
async function updateMaturationStart(context, item) {
    const wizardContext = {
        ...context,
        email: item.email,
        token: (0, nonNull_1.nonNullValue)(await (0, tokenUtils_1.getAuthToken)(item.email)),
        snapshotId: item.snapshotData.snap_id,
    };
    const wizard = new Wizard_1.Wizard(wizardContext, {
        title: vscode_1.l10n.t('Update maturation start date'),
        promptSteps: [
            new MaturationDatePromptStep_1.MaturationDatePromptStep({
                default: SnapshotMaturationStartItem_1.SnapshotMaturationStartItem.getMaturationStart(wizardContext.email, wizardContext.snapshotId),
                prompt: vscode_1.l10n.t('Enter maturation start date (mm/dd/yyyy)'),
            }),
        ],
        executeSteps: [
            new MaturationStartUpdateStep_1.MaturationStartUpdateStep(),
        ],
    });
    await wizard.prompt();
    await wizard.execute();
    void context.ui.showInformationMessage(vscode_1.l10n.t('Update maturation start date to "{0}"', (0, nonNull_1.nonNullProp)(wizardContext, 'maturationDate')));
    extensionVariables_1.ext.portfolioInstrumentsTdp.refresh(item.parent);
}


/***/ }),
/* 181 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MaturationStartUpdateStep = void 0;
const vscode_1 = __webpack_require__(1);
const SnapshotMaturationStartItem_1 = __webpack_require__(49);
const ExecuteStep_1 = __webpack_require__(104);
class MaturationStartUpdateStep extends ExecuteStep_1.ExecuteStep {
    priority;
    async execute(context, progress) {
        progress.report({ message: vscode_1.l10n.t("Updating maturation start...") });
        SnapshotMaturationStartItem_1.SnapshotMaturationStartItem.setMaturationStart(context.email, context.snapshotId, context.maturationDate || undefined);
    }
    shouldExecute() {
        return true;
    }
}
exports.MaturationStartUpdateStep = MaturationStartUpdateStep;


/***/ }),
/* 182 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateSnapshot = updateSnapshot;
const vscode_1 = __webpack_require__(1);
const nonNull_1 = __webpack_require__(12);
const tokenUtils_1 = __webpack_require__(6);
const Wizard_1 = __webpack_require__(67);
const extensionVariables_1 = __webpack_require__(2);
const SnapshotUpdateStep_1 = __webpack_require__(183);
const BenchmarkListStep_1 = __webpack_require__(116);
const SnapshotDateStep_1 = __webpack_require__(115);
const SnapshotDescriptionStep_1 = __webpack_require__(119);
const SnapshotRebalanceThresholdStep_1 = __webpack_require__(117);
const SnapshotDataItem_1 = __webpack_require__(31);
async function updateSnapshot(context, item) {
    const wizardContext = {
        ...context,
        email: item.email,
        token: (0, nonNull_1.nonNullValue)(await (0, tokenUtils_1.getAuthToken)(item.email)),
        snapDate: item.key === SnapshotDataItem_1.snapshotDateKey ? undefined : item.parent.snapshot.snap_date,
        snapDescription: item.key === SnapshotDataItem_1.snapshotDescriptionKey ? undefined : item.parent.snapshot.description,
        benchmarkId: item.key === SnapshotDataItem_1.snapshotBenchmarkKey ? undefined : item.parent.snapshot.benchmark_id,
        rebalanceThresholdPct: item.key === SnapshotDataItem_1.snapshotRebalanceThresholdKey ? undefined : item.parent.snapshot.rebalance_threshold_pct,
        snapshot: item.parent.snapshot,
    };
    const promptSteps = [];
    switch (item.key) {
        case SnapshotDataItem_1.snapshotDateKey:
            promptSteps.push(new SnapshotDateStep_1.SnapshotDateStep({ defaultDate: item.parent.snapshot.snap_date }));
            break;
        case SnapshotDataItem_1.snapshotDescriptionKey:
            promptSteps.push(new SnapshotDescriptionStep_1.SnapshotDescriptionStep());
            break;
        case SnapshotDataItem_1.snapshotBenchmarkKey:
            promptSteps.push(new BenchmarkListStep_1.BenchmarkListStep({ recommendedId: item.parent.snapshot.benchmark_id, suppressSkip: true }));
            break;
        case SnapshotDataItem_1.snapshotRebalanceThresholdKey:
            promptSteps.push(new SnapshotRebalanceThresholdStep_1.SnapshotRebalanceThresholdStep({ defaultThresholdPct: item.parent.snapshot.rebalance_threshold_pct }));
            break;
        default:
    }
    const wizard = new Wizard_1.Wizard(wizardContext, {
        title: vscode_1.l10n.t('Update snapshot'),
        promptSteps,
        executeSteps: [
            new SnapshotUpdateStep_1.SnapshotUpdateStep(),
        ],
    });
    await wizard.prompt();
    await wizard.execute();
    void context.ui.showInformationMessage(vscode_1.l10n.t('Update to snapshot dated "{0}"', (0, nonNull_1.nonNullValueAndProp)(wizardContext.updatedSnapshot, 'snap_date')));
    extensionVariables_1.ext.portfolioInstrumentsTdp.refresh(item.parent);
}


/***/ }),
/* 183 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotUpdateStep = void 0;
const vscode_1 = __webpack_require__(1);
const nonNull_1 = __webpack_require__(12);
const updateSnapshot_1 = __webpack_require__(184);
class SnapshotUpdateStep {
    priority;
    async execute(context, progress) {
        progress.report({ message: vscode_1.l10n.t("Updating snapshot...") });
        const response = await (0, updateSnapshot_1.updateSnapshot)((0, nonNull_1.nonNullProp)(context, 'token'), context.snapshot.snap_id, {
            snap_date: (0, nonNull_1.nonNullProp)(context, 'snapDate'),
            description: context.snapDescription,
            benchmark_id: context.benchmarkId,
            rebalance_threshold_pct: context.rebalanceThresholdPct,
        });
        if (response.error) {
            throw new Error(response.error);
        }
        context.updatedSnapshot = response.data?.snapshot;
    }
    shouldExecute(context) {
        return !context.updatedSnapshot;
    }
}
exports.SnapshotUpdateStep = SnapshotUpdateStep;


/***/ }),
/* 184 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateSnapshot = updateSnapshot;
const constants_1 = __webpack_require__(7);
const settingUtils_1 = __webpack_require__(11);
async function updateSnapshot(token, snapshotId, payload) {
    const response = await fetch(`${settingUtils_1.settingUtils.getApiEndpointBaseUrl()}/api/${constants_1.latestApiVersion}/snapshots/${snapshotId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });
    return await response.json();
}


/***/ }),
/* 185 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createSnapshotValue = createSnapshotValue;
const vscode_1 = __webpack_require__(1);
const nonNull_1 = __webpack_require__(12);
const tokenUtils_1 = __webpack_require__(6);
const Wizard_1 = __webpack_require__(67);
const HoldingListStep_1 = __webpack_require__(131);
const AccountListStep_1 = __webpack_require__(130);
const SnapshotValueTotalStep_1 = __webpack_require__(132);
const SnapshotValueCreateStep_1 = __webpack_require__(186);
const extensionVariables_1 = __webpack_require__(2);
const SnapshotValueSkipRebalanceStep_1 = __webpack_require__(133);
async function createSnapshotValue(context, item) {
    const wizardContext = {
        ...context,
        email: item.email,
        token: (0, nonNull_1.nonNullValue)(await (0, tokenUtils_1.getAuthToken)(item.email)),
        snapshotId: item.parent.snapshot.snap_id,
    };
    const wizard = new Wizard_1.Wizard(wizardContext, {
        title: vscode_1.l10n.t('Create snapshot value'),
        promptSteps: [
            new AccountListStep_1.AccountListStep(),
            new HoldingListStep_1.HoldingListStep(),
            new SnapshotValueTotalStep_1.SnapshotValueTotalStep(),
            new SnapshotValueSkipRebalanceStep_1.SnapshotValueSkipRebalanceStep(),
        ],
        executeSteps: [
            new SnapshotValueCreateStep_1.SnapshotValueCreateStep(),
        ],
    });
    await wizard.prompt();
    await wizard.execute();
    void context.ui.showInformationMessage(vscode_1.l10n.t('Created new snapshot value with total "{0}".', (0, nonNull_1.nonNullValueAndProp)(wizardContext.snapshotValue, 'total')));
    extensionVariables_1.ext.portfolioInstrumentsTdp.refresh(item.parent);
}


/***/ }),
/* 186 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotValueCreateStep = void 0;
const vscode_1 = __webpack_require__(1);
const nonNull_1 = __webpack_require__(12);
const createSnapshotValue_1 = __webpack_require__(187);
class SnapshotValueCreateStep {
    priority;
    async execute(context, progress) {
        progress.report({ message: vscode_1.l10n.t("Creating snapshot value...") });
        const response = await (0, createSnapshotValue_1.createSnapshotValue)((0, nonNull_1.nonNullProp)(context, 'token'), context.snapshotId, {
            account_id: (0, nonNull_1.nonNullProp)(context, 'accountId'),
            holding_id: (0, nonNull_1.nonNullProp)(context, 'holdingId'),
            total: (0, nonNull_1.nonNullProp)(context, 'total'),
            skip_rebalance: context.skipRebalance,
        });
        if (response.error) {
            throw new Error(response.error);
        }
        context.snapshotValue = response.data?.snapshot_value;
    }
    shouldExecute(context) {
        return !context.snapshotValue;
    }
}
exports.SnapshotValueCreateStep = SnapshotValueCreateStep;


/***/ }),
/* 187 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createSnapshotValue = createSnapshotValue;
const constants_1 = __webpack_require__(7);
const settingUtils_1 = __webpack_require__(11);
async function createSnapshotValue(token, snapshotId, payload) {
    const response = await fetch(`${settingUtils_1.settingUtils.getApiEndpointBaseUrl()}/api/${constants_1.latestApiVersion}/snapshots/${snapshotId}/values`, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });
    return await response.json();
}


/***/ }),
/* 188 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deleteSnapshotValue = deleteSnapshotValue;
const vscode_1 = __webpack_require__(1);
const nonNull_1 = __webpack_require__(12);
const tokenUtils_1 = __webpack_require__(6);
const Wizard_1 = __webpack_require__(67);
const extensionVariables_1 = __webpack_require__(2);
const SnapshotValueDeleteConfirmStep_1 = __webpack_require__(189);
const SnapshotValueDeleteStep_1 = __webpack_require__(190);
async function deleteSnapshotValue(context, item) {
    const wizardContext = {
        ...context,
        email: item.email,
        token: (0, nonNull_1.nonNullValue)(await (0, tokenUtils_1.getAuthToken)(item.email)),
        snapshotId: item.parent.snapshot.snap_id,
        snapshotValue: item.snapshotValue,
    };
    const wizard = new Wizard_1.Wizard(wizardContext, {
        title: vscode_1.l10n.t('Delete snapshot value'),
        promptSteps: [
            new SnapshotValueDeleteConfirmStep_1.SnapshotValueDeleteConfirmStep(),
        ],
        executeSteps: [
            new SnapshotValueDeleteStep_1.SnapshotValueDeleteStep(),
        ],
    });
    await wizard.prompt();
    await wizard.execute();
    void context.ui.showInformationMessage(vscode_1.l10n.t('Deleted snapshot value with total "{0}"', (0, nonNull_1.nonNullValueAndProp)(wizardContext.snapshotValue, 'total')));
    extensionVariables_1.ext.portfolioInstrumentsTdp.refresh(item.parent.parent);
}


/***/ }),
/* 189 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotValueDeleteConfirmStep = void 0;
const vscode_1 = __webpack_require__(1);
const PromptStep_1 = __webpack_require__(69);
class SnapshotValueDeleteConfirmStep extends PromptStep_1.PromptStep {
    async prompt(context) {
        const warning = vscode_1.l10n.t('Are you sure you want to delete snapshot value with total "{0}"?', context.snapshotValue.total);
        await context.ui.showWarningMessage(warning, { modal: true }, vscode_1.l10n.t('Confirm'));
    }
    shouldPrompt() {
        return true;
    }
}
exports.SnapshotValueDeleteConfirmStep = SnapshotValueDeleteConfirmStep;


/***/ }),
/* 190 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotValueDeleteStep = void 0;
const vscode_1 = __webpack_require__(1);
const nonNull_1 = __webpack_require__(12);
const deleteSnapshotValue_1 = __webpack_require__(191);
class SnapshotValueDeleteStep {
    priority;
    async execute(context, progress) {
        progress.report({ message: vscode_1.l10n.t("Deleting snapshot value...") });
        const response = await (0, deleteSnapshotValue_1.deleteSnapshotValue)((0, nonNull_1.nonNullProp)(context, 'token'), context.snapshotId, context.snapshotValue.snap_val_id);
        if (response.error) {
            throw new Error(response.error);
        }
    }
    shouldExecute(context) {
        return !!context.snapshotValue;
    }
}
exports.SnapshotValueDeleteStep = SnapshotValueDeleteStep;


/***/ }),
/* 191 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deleteSnapshotValue = deleteSnapshotValue;
const constants_1 = __webpack_require__(7);
const settingUtils_1 = __webpack_require__(11);
async function deleteSnapshotValue(token, snapshotId, snapshotValueId) {
    const response = await fetch(`${settingUtils_1.settingUtils.getApiEndpointBaseUrl()}/api/${constants_1.latestApiVersion}/snapshots/${snapshotId}/values/${snapshotValueId}`, {
        method: "DELETE",
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });
    return await response.json();
}


/***/ }),
/* 192 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateSnapshotValue = updateSnapshotValue;
const vscode_1 = __webpack_require__(1);
const nonNull_1 = __webpack_require__(12);
const tokenUtils_1 = __webpack_require__(6);
const Wizard_1 = __webpack_require__(67);
const AccountListStep_1 = __webpack_require__(130);
const HoldingListStep_1 = __webpack_require__(131);
const SnapshotValueTotalStep_1 = __webpack_require__(132);
const SnapshotValueSkipRebalanceStep_1 = __webpack_require__(133);
const SnapshotValueUpdateStep_1 = __webpack_require__(193);
const extensionVariables_1 = __webpack_require__(2);
async function updateSnapshotValue(context, item) {
    const wizardContext = {
        ...context,
        email: item.email,
        token: (0, nonNull_1.nonNullValue)(await (0, tokenUtils_1.getAuthToken)(item.email)),
        snapshotId: item.snapshotValue.snap_id,
        snapshotValue: item.snapshotValue,
    };
    const wizard = new Wizard_1.Wizard(wizardContext, {
        title: vscode_1.l10n.t('Create snapshot value'),
        promptSteps: [
            new AccountListStep_1.AccountListStep({ currentId: wizardContext.snapshotValue.account_id }),
            new HoldingListStep_1.HoldingListStep({ currentId: wizardContext.snapshotValue.holding_id }),
            new SnapshotValueTotalStep_1.SnapshotValueTotalStep(),
            new SnapshotValueSkipRebalanceStep_1.SnapshotValueSkipRebalanceStep(),
        ],
        executeSteps: [
            new SnapshotValueUpdateStep_1.SnapshotValueUpdateStep(),
        ],
    });
    await wizard.prompt();
    await wizard.execute();
    void context.ui.showInformationMessage(vscode_1.l10n.t('Updated snapshot value to new total "{0}".', (0, nonNull_1.nonNullValueAndProp)(wizardContext.updatedSnapshotValue, 'total')));
    extensionVariables_1.ext.portfolioInstrumentsTdp.refresh(item.parent.parent);
}


/***/ }),
/* 193 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotValueUpdateStep = void 0;
const vscode_1 = __webpack_require__(1);
const nonNull_1 = __webpack_require__(12);
const updateSnapshotValue_1 = __webpack_require__(194);
class SnapshotValueUpdateStep {
    priority;
    async execute(context, progress) {
        progress.report({ message: vscode_1.l10n.t("Updating snapshot value...") });
        const response = await (0, updateSnapshotValue_1.updateSnapshotValue)((0, nonNull_1.nonNullProp)(context, 'token'), context.snapshotId, context.snapshotValue.snap_val_id, {
            account_id: (0, nonNull_1.nonNullProp)(context, 'accountId'),
            holding_id: (0, nonNull_1.nonNullProp)(context, 'holdingId'),
            total: (0, nonNull_1.nonNullProp)(context, 'total'),
            skip_rebalance: context.skipRebalance,
        });
        if (response.error) {
            throw new Error(response.error);
        }
        context.updatedSnapshotValue = response.data?.snapshot_value;
    }
    shouldExecute(context) {
        return !context.updatedSnapshotValue;
    }
}
exports.SnapshotValueUpdateStep = SnapshotValueUpdateStep;


/***/ }),
/* 194 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.updateSnapshotValue = updateSnapshotValue;
const constants_1 = __webpack_require__(7);
const settingUtils_1 = __webpack_require__(11);
async function updateSnapshotValue(token, snapshotId, snapshotValueId, payload) {
    const response = await fetch(`${settingUtils_1.settingUtils.getApiEndpointBaseUrl()}/api/${constants_1.latestApiVersion}/snapshots/${snapshotId}/values/${snapshotValueId}`, {
        method: "PUT",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
    });
    return await response.json();
}


/***/ }),
/* 195 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.viewProperties = viewProperties;
const vscode_1 = __webpack_require__(1);
const ReadOnlyContentProvider_1 = __webpack_require__(196);
const nonNull_1 = __webpack_require__(12);
const extensionVariables_1 = __webpack_require__(2);
async function viewProperties(_, item) {
    if (!item?.viewProperties) {
        throw new Error(vscode_1.l10n.t("internal error: item does not have a view properties defined"));
    }
    const props = await item.viewProperties();
    const uri = ReadOnlyContentProvider_1.ReadOnlyContentProvider.getUri((0, nonNull_1.nonNullValue)(item?.id));
    extensionVariables_1.ext.readOnlyProvider.addContent(uri, props);
    extensionVariables_1.ext.readOnlyProvider.displayContent(uri);
}


/***/ }),
/* 196 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.ReadOnlyContentProvider = void 0;
const vscode_1 = __webpack_require__(1);
class ReadOnlyContentProvider {
    static scheme = 'pi-readonly';
    contentMap = new Map;
    onDidChangeEmitter = new vscode_1.EventEmitter();
    onDidChange = this.onDidChangeEmitter.event;
    provideTextDocumentContent(uri) {
        return this.contentMap.get(uri.path) ?? '';
    }
    addContent(uri, content) {
        this.contentMap.set(uri.path, content);
        this.onDidChangeEmitter.fire(uri);
    }
    async displayContent(uri) {
        const textDocument = await vscode_1.workspace.openTextDocument(uri);
        await vscode_1.window.showTextDocument(textDocument);
    }
    static getUri(id) {
        return vscode_1.Uri.parse(ReadOnlyContentProvider.scheme + ':' + id);
    }
}
exports.ReadOnlyContentProvider = ReadOnlyContentProvider;


/***/ }),
/* 197 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.toggleShowDeprecatedResources = toggleShowDeprecatedResources;
const vscode_1 = __webpack_require__(1);
const extensionVariables_1 = __webpack_require__(2);
const settingUtils_1 = __webpack_require__(11);
async function toggleShowDeprecatedResources() {
    const currentValue = settingUtils_1.settingUtils.getShowDeprecatedResources();
    await settingUtils_1.settingUtils.updateShowDeprecatedResources(!currentValue);
    const newState = !currentValue ? vscode_1.l10n.t('shown') : vscode_1.l10n.t('hidden');
    vscode_1.window.showInformationMessage(vscode_1.l10n.t('Deprecated resources are now {0}', newState));
    extensionVariables_1.ext.portfolioInstrumentsTdp.refresh();
}


/***/ }),
/* 198 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.undeprecate = undeprecate;
const vscode_1 = __webpack_require__(1);
const nonNull_1 = __webpack_require__(12);
const tokenUtils_1 = __webpack_require__(6);
const extensionVariables_1 = __webpack_require__(2);
const AccountDeprecatedItem_1 = __webpack_require__(16);
const HoldingDeprecatedItem_1 = __webpack_require__(23);
const BenchmarkDeprecatedItem_1 = __webpack_require__(27);
const updateAccount_1 = __webpack_require__(83);
const updateHolding_1 = __webpack_require__(157);
const updateBenchmark_1 = __webpack_require__(113);
const AccountsItem_1 = __webpack_require__(9);
const HoldingsItem_1 = __webpack_require__(20);
const BenchmarksItem_1 = __webpack_require__(24);
async function undeprecate(context, item) {
    const token = (0, nonNull_1.nonNullValue)(await (0, tokenUtils_1.getAuthToken)(item.email));
    const itemLabel = typeof item.label === 'string' ? item.label : item.label?.label || 'resource';
    const confirmMessage = vscode_1.l10n.t('Are you sure you want to restore "{0}" as an active resource?', itemLabel);
    const confirm = await vscode_1.window.showWarningMessage(confirmMessage, { modal: true }, vscode_1.l10n.t('Restore'));
    if (confirm !== vscode_1.l10n.t('Restore')) {
        return;
    }
    await vscode_1.window.withProgress({
        location: { viewId: 'portfolioInstruments.main' },
        title: vscode_1.l10n.t('Restoring resource...'),
    }, async () => {
        if (item instanceof AccountDeprecatedItem_1.AccountDeprecatedItem) {
            const response = await (0, updateAccount_1.updateAccount)(token, item.account.account_id, {
                name: item.account.name,
                description: item.account.description,
                institution: item.account.institution,
                tax_shelter: item.account.tax_shelter,
                is_deprecated: false,
            });
            if (response.error) {
                throw new Error(response.error);
            }
            extensionVariables_1.ext.resourceCache.delete(AccountsItem_1.AccountsItem.generatePiExtAccountsId(item.email));
            extensionVariables_1.ext.portfolioInstrumentsTdp.refresh(item.parent);
        }
        else if (item instanceof HoldingDeprecatedItem_1.HoldingDeprecatedItem) {
            const response = await (0, updateHolding_1.updateHolding)(token, item.holding.holding_id, {
                name: item.holding.name,
                ticker: item.holding.ticker,
                asset_category: item.holding.asset_category,
                expense_ratio_pct: item.holding.expense_ratio_pct,
                maturation_date: item.holding.maturation_date,
                interest_rate_pct: item.holding.interest_rate_pct,
                is_deprecated: false,
            });
            if (response.error) {
                throw new Error(response.error);
            }
            extensionVariables_1.ext.resourceCache.delete(HoldingsItem_1.HoldingsItem.generatePiExtHoldingsId(item.email));
            extensionVariables_1.ext.portfolioInstrumentsTdp.refresh(item.parent);
        }
        else if (item instanceof BenchmarkDeprecatedItem_1.BenchmarkDeprecatedItem) {
            const response = await (0, updateBenchmark_1.updateBenchmark)(token, item.benchmark.benchmark_id, {
                name: item.benchmark.name,
                description: item.benchmark.description,
                asset_allocation: item.benchmark.asset_allocation,
                std_dev_pct: item.benchmark.std_dev_pct,
                real_return_pct: item.benchmark.real_return_pct,
                drawdown_yrs: item.benchmark.drawdown_yrs,
                rec_rebalance_threshold_pct: item.benchmark.rec_rebalance_threshold_pct,
                is_deprecated: false,
            });
            if (response.error) {
                throw new Error(response.error);
            }
            extensionVariables_1.ext.resourceCache.delete(BenchmarksItem_1.BenchmarksItem.generatePiExtBenchmarksId(item.email));
            extensionVariables_1.ext.portfolioInstrumentsTdp.refresh(item.parent);
        }
    });
    void context.ui.showInformationMessage(vscode_1.l10n.t('Restored "{0}" as an active resource', itemLabel));
}


/***/ }),
/* 199 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.refresh = refresh;
exports.refreshNode = refreshNode;
const extensionVariables_1 = __webpack_require__(2);
async function refresh(_context) {
    extensionVariables_1.ext.portfolioInstrumentsTdp.refresh();
}
async function refreshNode(_context, node) {
    extensionVariables_1.ext.portfolioInstrumentsTdp.refresh(node);
}


/***/ }),
/* 200 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.collapseAll = collapseAll;
const vscode_1 = __webpack_require__(1);
async function collapseAll(_context) {
    await vscode_1.commands.executeCommand('workbench.actions.treeView.portfolioInstruments.main.collapseAll');
}


/***/ }),
/* 201 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SnapshotDraftFileSystem = exports.SnapshotDraftFile = void 0;
const vscode_1 = __webpack_require__(1);
const extensionVariables_1 = __webpack_require__(2);
const nonNull_1 = __webpack_require__(12);
const getSnapshot_1 = __webpack_require__(33);
const tokenUtils_1 = __webpack_require__(6);
const notSupported = vscode_1.l10n.t('This operation is not currently supported.');
class SnapshotDraftFile {
    parentItem;
    _snapshotData;
    type = vscode_1.FileType.File;
    size;
    ctime;
    mtime;
    contents;
    constructor(contents, // snapshot_values
    parentItem, _snapshotData) {
        this.parentItem = parentItem;
        this._snapshotData = _snapshotData;
        this.contents = contents;
        this.size = contents.byteLength;
        this.ctime = Date.now();
        this.mtime = Date.now();
    }
    get snapshotData() {
        return this._snapshotData;
    }
    set snapshotData(payload) {
        this._snapshotData = payload;
    }
}
exports.SnapshotDraftFile = SnapshotDraftFile;
/**
 * File system provider that allows for reading/writing/deploying snapshot revision drafts
 *
 * Enforces a policy of one revision draft per email
 */
class SnapshotDraftFileSystem {
    static scheme = 'piSnapshotDrafts';
    emitter = new vscode_1.EventEmitter();
    get onDidChangeFile() {
        return this.emitter.event;
    }
    bufferedEvents = [];
    fireSoonHandle;
    draftStore = new Map();
    createSnapshotDraft(parentItem, snapshotPayload, snapshotValuesPayload) {
        const uri = this.buildUri(parentItem.email);
        if (this.draftStore.has(uri.path)) {
            return;
        }
        const file = new SnapshotDraftFile(Buffer.from(JSON.stringify(snapshotValuesPayload, undefined, 4)), parentItem, snapshotPayload);
        this.draftStore.set(uri.path, file);
        this.fireSoon({ type: vscode_1.FileChangeType.Created, uri });
        extensionVariables_1.ext.portfolioInstrumentsTdp.refresh(parentItem);
    }
    parseSnapshotDraft(email) {
        const uri = this.buildUri(email);
        if (!this.draftStore.has(uri.path)) {
            return undefined;
        }
        const file = (0, nonNull_1.nonNullValue)(this.draftStore.get(uri.path));
        const partialSnapshotPayload = file.snapshotData;
        return { ...partialSnapshotPayload, snapshot_values: JSON.parse(this.readFile(uri).toString()) };
    }
    readFile(uri) {
        const contents = this.draftStore.get(uri.path)?.contents;
        return contents ? Buffer.from(contents) : Buffer.from('');
    }
    hasSnapshotDraft(email) {
        const uri = this.buildUri(email);
        return this.draftStore.has(uri.path);
    }
    getSnapshotDraftFile(email) {
        const uri = this.buildUri(email);
        return this.draftStore.get(uri.path);
    }
    stat(uri) {
        const file = this.draftStore.get(uri.path);
        if (file) {
            return {
                type: file.type,
                ctime: file.ctime,
                mtime: file.mtime,
                size: file.size
            };
        }
        else {
            return { type: vscode_1.FileType.File, ctime: 0, mtime: 0, size: 0 };
        }
    }
    async editSnapshotDraft(item) {
        const uri = this.buildUri(item.email);
        if (!this.draftStore.has(uri.path)) {
            this.createSnapshotDraft(item.parent, item.snapshotData, (await (0, getSnapshot_1.getSnapshotLatest)((0, nonNull_1.nonNullValue)(await (0, tokenUtils_1.getAuthToken)(item.email)))).data?.snapshot_values ?? []);
        }
        const textDoc = await vscode_1.workspace.openTextDocument(uri);
        await vscode_1.window.showTextDocument(textDoc);
    }
    writeFile(uri, contents) {
        const file = this.draftStore.get(uri.path);
        if (!file || (Buffer.from(file.contents).equals(Buffer.from(contents)))) {
            return;
        }
        file.contents = contents;
        file.size = contents.byteLength;
        file.mtime = Date.now();
        this.draftStore.set(uri.path, file);
        this.fireSoon({ type: vscode_1.FileChangeType.Changed, uri });
        extensionVariables_1.ext.portfolioInstrumentsTdp.refresh(file.parentItem);
    }
    async updateSnapshotDraft(item, snapshot) {
        const uri = this.buildUri(item.email);
        if (!this.draftStore.has(uri.path)) {
            this.createSnapshotDraft(item.parent, item.snapshotData, (await (0, getSnapshot_1.getSnapshotLatest)((0, nonNull_1.nonNullValue)(await (0, tokenUtils_1.getAuthToken)(item.email)))).data?.snapshot_values ?? []);
        }
        const file = (0, nonNull_1.nonNullValue)(this.draftStore.get(uri.path));
        file.snapshotData = snapshot;
    }
    async updateSnapshotValuesDraft(item, snapshotValues) {
        const uri = this.buildUri(item.email);
        if (!this.draftStore.has(uri.path)) {
            this.createSnapshotDraft(item.parent, item.snapshotData, (await (0, getSnapshot_1.getSnapshotLatest)((0, nonNull_1.nonNullValue)(await (0, tokenUtils_1.getAuthToken)(item.email)))).data?.snapshot_values ?? []);
        }
        const newContent = Buffer.from(JSON.stringify(snapshotValues, undefined, 4));
        this.writeFile(uri, newContent);
    }
    discardSnapshotDraft(item) {
        const uri = this.buildUri(item.email);
        if (!this.draftStore.has(uri.path)) {
            return;
        }
        this.delete(uri);
        extensionVariables_1.ext.portfolioInstrumentsTdp.refresh(item.parent);
    }
    delete(uri) {
        this.draftStore.delete(uri.path);
        this.fireSoon({ type: vscode_1.FileChangeType.Deleted, uri });
    }
    buildUri(email) {
        return vscode_1.Uri.parse(`${SnapshotDraftFileSystem.scheme}:/${email}.pi-snapshot.json`);
    }
    // Adapted from: https://github.com/microsoft/vscode-extension-samples/blob/master/fsprovider-sample/src/fileSystemProvider.ts
    fireSoon(...events) {
        this.bufferedEvents.push(...events);
        if (this.fireSoonHandle) {
            clearTimeout(this.fireSoonHandle);
        }
        this.fireSoonHandle = setTimeout(() => {
            this.emitter.fire(this.bufferedEvents);
            this.bufferedEvents.length = 0;
        }, 5);
    }
    watch() {
        return new vscode_1.Disposable(() => { });
    }
    readDirectory() {
        throw new Error(notSupported);
    }
    createDirectory() {
        throw new Error(notSupported);
    }
    rename() {
        throw new Error(notSupported);
    }
}
exports.SnapshotDraftFileSystem = SnapshotDraftFileSystem;


/***/ }),
/* 202 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PiExtTreeDragAndDropController = void 0;
const vscode_1 = __webpack_require__(1);
const reorder_1 = __webpack_require__(17);
const defaultTreeViewMimeType = 'application/vnd.code.tree.portfolioInstruments.main';
class PiExtTreeDragAndDropController {
    dropMimeTypes = [defaultTreeViewMimeType];
    dragMimeTypes = [defaultTreeViewMimeType];
    handleDrag(draggedItems, dataTransfer, _token) {
        // All dragged items should be classified as 'reorderable'
        if (!draggedItems.every(i => (0, reorder_1.isReorderable)(i))) {
            return;
        }
        // Parent should classify as a 'reorderer'
        const parent = draggedItems[0].parent;
        if (!(0, reorder_1.isReorderer)(parent)) {
            return;
        }
        const kind = draggedItems[0].kind;
        if (!draggedItems.every(i => i.kind === kind && // Don't try to handle different child kinds during the same drag/drop motion
            i.parent.kind === parent.kind && // Not a super important check, but can't hurt to double check that the parents are all the same
            parent.canReorderItem(i) // The common parent should be configured to understand how to reorder the child elements
        )) {
            return;
        }
        dataTransfer.set(defaultTreeViewMimeType, new vscode_1.DataTransferItem({
            reorderer: parent,
            reorderables: draggedItems,
        }));
    }
    async handleDrop(target, dataTransfer, _token) {
        const dt = dataTransfer.get(defaultTreeViewMimeType)?.value;
        if (!dt || !target) {
            return;
        }
        if (!(0, reorder_1.isReorderable)(target)) {
            return;
        }
        const { reorderer, reorderables } = dt;
        const orderedResources = await reorderer.getOrderedResourceModels();
        // Use a map to preserve the order and extract the resources; easier/more efficient than finding the index and splicing
        const orderedResourceMap = new Map();
        for (const resource of orderedResources) {
            orderedResourceMap.set(resource.id, resource);
        }
        const extractedResources = [];
        for (const reorderable of reorderables) {
            const resourceId = reorderable.getResourceId();
            const resource = orderedResourceMap.get(resourceId);
            if (!resource) {
                continue;
            }
            extractedResources.push(resource);
            orderedResourceMap.delete(resourceId);
        }
        const remainingOrderedResources = Array.from(orderedResourceMap.values());
        const targetIdx = remainingOrderedResources.findIndex(r => r.id === target.getResourceId());
        if (targetIdx === -1) {
            return;
        }
        // Rebuild array of resources, placing extracted resources at the target idx
        const newOrderedResources = [];
        if (targetIdx !== 0) {
            newOrderedResources.push(...remainingOrderedResources.slice(0, targetIdx));
        }
        newOrderedResources.push(...extractedResources);
        newOrderedResources.push(...remainingOrderedResources.slice(targetIdx));
        const newOrderedResourceIds = newOrderedResources.map(r => r.id);
        reorderer.reorderChildrenByTargetResourceModelIds(newOrderedResourceIds);
    }
}
exports.PiExtTreeDragAndDropController = PiExtTreeDragAndDropController;


/***/ }),
/* 203 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PiExtCodeLensProvider = void 0;
const vscode = __importStar(__webpack_require__(1));
const AccountsItem_1 = __webpack_require__(9);
const HoldingsItem_1 = __webpack_require__(20);
class PiExtCodeLensProvider {
    static fileSuffix = '.pi-snapshot.json';
    openDocuments = new Set();
    onDidChangeCodeLensEmitter = new vscode.EventEmitter();
    onDidChangeCodeLens = this.onDidChangeCodeLensEmitter.event;
    constructor() {
        vscode.workspace.onDidOpenTextDocument((document) => {
            if (document.fileName.endsWith(PiExtCodeLensProvider.fileSuffix) && !this.openDocuments.has(document.fileName)) {
                this.openDocuments.add(document.fileName);
                this.onDidChangeCodeLensEmitter.fire();
            }
        });
        vscode.workspace.onDidSaveTextDocument((document) => {
            if (document.fileName.endsWith(PiExtCodeLensProvider.fileSuffix)) {
                this.onDidChangeCodeLensEmitter.fire();
            }
        });
        vscode.workspace.onDidCloseTextDocument((document) => {
            if (document.fileName.endsWith(PiExtCodeLensProvider.fileSuffix)) {
                this.openDocuments.delete(document.fileName);
                this.onDidChangeCodeLensEmitter.fire();
            }
        });
    }
    async provideCodeLenses(document, token) {
        if (!document.fileName.endsWith(PiExtCodeLensProvider.fileSuffix)) {
            return [];
        }
        const codeLenses = [];
        const text = document.getText();
        const lines = text.split('\n');
        for (let l = 0; l < lines.length; l++) {
            if (token.isCancellationRequested) {
                return [];
            }
            const line = document.lineAt(l);
            const startIndexOf = line.text.indexOf('{');
            if (startIndexOf === -1) {
                continue;
            }
            // Identify the start of an object
            const startPosition = new vscode.Position(line.lineNumber, startIndexOf);
            // Capture until the end of the object
            let accountId;
            let holdingId;
            let endPosition;
            while (true) {
                l++;
                if (l >= lines.length) {
                    break;
                }
                const line = document.lineAt(l);
                // example - "account_id": 7,
                if (line.text.includes('account_id')) {
                    const acc = /"account_id": (\d+)/.exec(line.text);
                    if (acc && acc[1]) {
                        accountId = acc[1];
                    }
                }
                // example - "holding_id": 10, 
                if (line.text.includes('holding_id')) {
                    const hold = /"holding_id": (\d+)/.exec(line.text);
                    if (hold && hold[1]) {
                        holdingId = hold[1];
                    }
                }
                const endIndexOf = line.text.indexOf('}');
                if (endIndexOf !== -1) {
                    endPosition = new vscode.Position(line.lineNumber, endIndexOf);
                    break;
                }
            }
            if (!endPosition) {
                break;
            }
            if (!accountId || !holdingId) {
                continue;
            }
            const email = document.fileName.slice(1, -PiExtCodeLensProvider.fileSuffix.length);
            const commandTitle = await this.buildCommandTitle(email, accountId, holdingId);
            if (!commandTitle) {
                continue;
            }
            const range = new vscode.Range(startPosition, endPosition);
            const command = {
                title: commandTitle,
                command: '',
            };
            codeLenses.push(new vscode.CodeLens(range, command));
        }
        return codeLenses;
    }
    async buildCommandTitle(email, accountId, holdingId) {
        const accounts = await AccountsItem_1.AccountsItem.getAccountsWithCache(email);
        const account = accounts.find(a => a.account_id.toString() === accountId);
        const holdings = await HoldingsItem_1.HoldingsItem.getHoldingsWithCache(email);
        const holding = holdings.find(h => h.holding_id.toString() === holdingId);
        if (!account || !holding) {
            return undefined;
        }
        let commandTitle = `${account.institution} | ${account.name} | ${account.tax_shelter}`;
        if (holding.ticker) {
            commandTitle += ` | ${holding.ticker}`;
        }
        commandTitle += ` | ${holding.name}`;
        if (holding.interest_rate_pct) {
            commandTitle += ` | ${holding.interest_rate_pct}%`;
        }
        if (holding.maturation_date) {
            commandTitle += ` | ${holding.maturation_date}`;
        }
        return commandTitle;
    }
    async resolveCodeLens(codeLens) {
        return codeLens;
    }
}
exports.PiExtCodeLensProvider = PiExtCodeLensProvider;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
var exports = __webpack_exports__;

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.activate = activate;
exports.deactivate = deactivate;
const vscode_1 = __webpack_require__(1);
const extensionVariables_1 = __webpack_require__(2);
const PiExtTreeDataProvider_1 = __webpack_require__(3);
const registerCommands_1 = __webpack_require__(65);
const ReadOnlyContentProvider_1 = __webpack_require__(196);
const SnapshotDraftFileSystem_1 = __webpack_require__(201);
const PiExtTreeDragAndDropController_1 = __webpack_require__(202);
const PiExtCodeLensProvider_1 = __webpack_require__(203);
function activate(context) {
    extensionVariables_1.ext.context = context;
    extensionVariables_1.ext.resourceCache = new Map();
    const documentSelector = { scheme: SnapshotDraftFileSystem_1.SnapshotDraftFileSystem.scheme, pattern: '**/*.pi-snapshot.json' };
    context.subscriptions.push(vscode_1.languages.registerCodeLensProvider(documentSelector, new PiExtCodeLensProvider_1.PiExtCodeLensProvider()));
    extensionVariables_1.ext.portfolioInstrumentsTdp = new PiExtTreeDataProvider_1.PiExtTreeDataProvider();
    context.subscriptions.push(vscode_1.window.createTreeView('portfolioInstruments.main', {
        treeDataProvider: extensionVariables_1.ext.portfolioInstrumentsTdp,
        dragAndDropController: new PiExtTreeDragAndDropController_1.PiExtTreeDragAndDropController(),
        canSelectMany: true,
    }));
    extensionVariables_1.ext.readOnlyProvider = new ReadOnlyContentProvider_1.ReadOnlyContentProvider();
    context.subscriptions.push(vscode_1.workspace.registerTextDocumentContentProvider(ReadOnlyContentProvider_1.ReadOnlyContentProvider.scheme, extensionVariables_1.ext.readOnlyProvider));
    extensionVariables_1.ext.snapshotDraftFileSystem = new SnapshotDraftFileSystem_1.SnapshotDraftFileSystem();
    context.subscriptions.push(vscode_1.workspace.registerFileSystemProvider(SnapshotDraftFileSystem_1.SnapshotDraftFileSystem.scheme, extensionVariables_1.ext.snapshotDraftFileSystem));
    (0, registerCommands_1.registerCommands)();
}
function deactivate() { }

})();

module.exports = __webpack_exports__;
/******/ })()
;
//# sourceMappingURL=extension.js.map