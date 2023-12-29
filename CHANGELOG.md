# 2.0.0 (2023-12-29)


### Bug Fixes

* **ci/cd:** Ensure IMAGE_TAG is set for Docker Compose build ([9c4ed8a](https://github.com/xosnrdev/carai-api/commit/9c4ed8a2b595581ec9b7d864cf53c35a45dd5dfb))
* **ci/cd:** Ensure IMAGE_TAG is set for Docker Compose build ([840dc97](https://github.com/xosnrdev/carai-api/commit/840dc9740398b5edad674effa832239903df02dd))
* **docker-compose:** Correct environment variable interpolation for ECR image tagging ([a467fd3](https://github.com/xosnrdev/carai-api/commit/a467fd311937fd0385c32a3353e901f35a1f860a))
* **docker:** Correct entry-point script path and permissions ([3102534](https://github.com/xosnrdev/carai-api/commit/31025342290200cba00213b0730dc74f2212cc4a))
* migrate from ecs farget to ecs ec2 for docker socket support ([e9778dd](https://github.com/xosnrdev/carai-api/commit/e9778ddbb280cf22a621acd14cdfdce1721a6d31))


### Features

* **ci/cd:** Enhance error handling and add health checks in ECS deployment ([4959405](https://github.com/xosnrdev/carai-api/commit/4959405e74e4c1f285af61f53d504024814e9970))
* **ci/cd:** Integrate Docker Compose with ECS deployment and ECR image management ([e18a4dc](https://github.com/xosnrdev/carai-api/commit/e18a4dc63c08123deaa6ad63a1221eb46cac3025))
* **ci/cd:** Integrate Docker Compose with ECS deployment and ECR image management ([73d021d](https://github.com/xosnrdev/carai-api/commit/73d021d45300c222618cda668db12be75d8cd16a))
* **ci/cd:** Integrate OIDC with ECR login and Docker Compose for image pushing ([4aa0ffb](https://github.com/xosnrdev/carai-api/commit/4aa0ffb79c9a1dfd77590ca5fefcb8b29d335519))
* **docker:** Initialize Docker configuration for api service ([6af9bd4](https://github.com/xosnrdev/carai-api/commit/6af9bd4602a1aa11f9f090ac073976bc454ef191))
* **docker:** Initialize Docker configuration for api service ([5b5d4f4](https://github.com/xosnrdev/carai-api/commit/5b5d4f474f1e913e79c22c510432719d6bb9b0d5))
* Implement Docker context for ECS deployment in CI/CD ([daea82a](https://github.com/xosnrdev/carai-api/commit/daea82ae26d09944ff0b132349da776bb9138aa9))


### BREAKING CHANGES

* **ci/cd:** The deployment process now fully relies on Docker Compose and ECS context. Ensure existing deployment configurations are compatible with these changes.
* **ci/cd:** The deployment process now fully relies on Docker Compose and ECS context. Ensure existing deployment configurations are compatible with these changes.



