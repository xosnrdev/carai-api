# 1.0.0 (2023-12-29)


### Bug Fixes

* **docker:** Correct entry-point script path and permissions ([3102534](https://github.com/xosnrdev/carai-api/commit/31025342290200cba00213b0730dc74f2212cc4a))
* migrate from ecs farget to ecs ec2 for docker socket support ([e9778dd](https://github.com/xosnrdev/carai-api/commit/e9778ddbb280cf22a621acd14cdfdce1721a6d31))


### Features

* **ci/cd:** Integrate Docker Compose with ECS deployment and ECR image management ([e18a4dc](https://github.com/xosnrdev/carai-api/commit/e18a4dc63c08123deaa6ad63a1221eb46cac3025))
* **ci/cd:** Integrate Docker Compose with ECS deployment and ECR image management ([73d021d](https://github.com/xosnrdev/carai-api/commit/73d021d45300c222618cda668db12be75d8cd16a))
* **docker:** Initialize Docker configuration for api service ([6af9bd4](https://github.com/xosnrdev/carai-api/commit/6af9bd4602a1aa11f9f090ac073976bc454ef191))
* **docker:** Initialize Docker configuration for api service ([5b5d4f4](https://github.com/xosnrdev/carai-api/commit/5b5d4f474f1e913e79c22c510432719d6bb9b0d5))


### BREAKING CHANGES

* **ci/cd:** The deployment process now fully relies on Docker Compose and ECS context. Ensure existing deployment configurations are compatible with these changes.
* **ci/cd:** The deployment process now fully relies on Docker Compose and ECS context. Ensure existing deployment configurations are compatible with these changes.




