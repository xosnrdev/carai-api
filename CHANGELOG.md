# 2.0.0 (2023-12-29)


### Bug Fixes

* **docker:** Correct entry-point script path and permissions ([3102534](https://github.com/xosnrdev/carai-api/commit/31025342290200cba00213b0730dc74f2212cc4a))
* migrate from ecs farget to ecs ec2 for docker socket support ([e9778dd](https://github.com/xosnrdev/carai-api/commit/e9778ddbb280cf22a621acd14cdfdce1721a6d31))


### Features

* **ci/cd:** Integrate Docker Compose with ECS deployment and ECR image management ([e18a4dc](https://github.com/xosnrdev/carai-api/commit/e18a4dc63c08123deaa6ad63a1221eb46cac3025))
* **ci/cd:** Integrate Docker Compose with ECS deployment and ECR image management ([73d021d](https://github.com/xosnrdev/carai-api/commit/73d021d45300c222618cda668db12be75d8cd16a))


### BREAKING CHANGES

* **ci/cd:** The deployment process now fully relies on Docker Compose and ECS context. Ensure existing deployment configurations are compatible with these changes.
* **ci/cd:** The deployment process now fully relies on Docker Compose and ECS context. Ensure existing deployment configurations are compatible with these changes.



