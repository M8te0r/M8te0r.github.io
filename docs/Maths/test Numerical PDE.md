# Numerical PDE

## PDE 建模

给定一个铁棒，其左端温度为100度，右端温度为0度。现在对这跟铁棒上的热传导过程建模。

$$
A[q(x,t)-q(x+\Delta x,t)] \Delta t=\rho A \Delta x C [u(x,t+\Delta t)-u(x,t)]
$$

-  $A$ 是铁棒的截面积
-  $q(x,t)$ 表示铁棒上 $x$ 处，$t$ 时刻的热通量（热密度）。
-  $\rho$ 是密度，$\rho A \Delta x$ 构成了 $\Delta x$ 的质量。
-  $C$ 是比热容。
-  $u(x,t)$ 表示铁棒上 $x$ 处，$t$ 时刻的温度。

 $q$ 和 $u$ 有如下关系：

$$
q=-k\frac{\partial u}{\partial x}
$$

-  $k$ 是材料的热传导率。

那么，对建模的公式两边同时除以 $A \Delta x \Delta t$ ，有：

$$
\frac{q(x,t)-q(x+\Delta x,t)}{\Delta x}=\frac{u(x,t+\Delta t)-u(x,t)}{\Delta t}
$$
